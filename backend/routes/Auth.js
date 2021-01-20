const router = require('express').Router();
const Auth = require('../models/auth');
const WannabeEmployee = require('../models/wannabeEmployee')

// "google-oauth2|113818401233931612247"
// "auth0|5ffab4f0901fa7006e4a3b27"
// "google-oauth2|105916184375669631353"

router.route('/').get((req, res) => {
    Auth.find({}, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})


router.route('/check/:id').get((req, res) => {
    let id = req.params.id;
    console.log(id)
    Auth.find({}, (err, result) => {
        if (err) {
            res.send({
                "error": err.message
            })
        }
        else {
            const admins = result[0]['admin']
            const employees = result[0]['employee']
            let isAdmin = false;
            let isEmployee = false;
            admins.forEach((admin) => {
                if (admin === id) {
                    isAdmin = true;
                }
            })
            if (!isAdmin) {
                employees.forEach((employee) => {
                    if (employee === id) {
                        isEmployee = true;
                    }
                })
            }

            if (isAdmin) {
                res.send({
                    "scope": 'admin'
                })
            }
            else if (isEmployee) {
                res.send({
                    "scope": 'employee'
                })
            }
            else {
                res.send({
                    "scope": 'unknown'
                })
            }
        }
    })
})

router.route('/addAdmin').post((req, res) => {

    let auth_id = req.body.auth_id;
    console.log(auth_id)
    Auth.findOneAndUpdate(
        {},
        { $push: { admin: auth_id } },
        (err, result) => {
            if (err) {
                res.send({
                    "error": err.message
                })
            }
            else {
                res.send({
                    "message": "New Admin Added"
                })
            }
        }

    )

})

router.route('/addEmployee').post((req, res) => {

    let auth_id = req.body.auth_id;
    console.log(auth_id)
    Auth.findOneAndUpdate(
        {},
        { $push: { employee: auth_id } },
        (err, result) => {
            if (err) {
                res.send({
                    "error": err.message
                })
            }
            else {
                res.send({
                    "message": "New Employee Added"
                })
            }
        }

    )
    WannabeEmployee.findOneAndDelete(
        { sub: auth_id },
        (err, result) => {
            if (err)
                console.log(err);
            else
                console.log(result)
        }
    )

})

router.route('/clear').get((req, res) => {
    Auth.find({}, (err, result) => {
        result.forEach(item => {
            Auth.findByIdAndDelete(item["_id"], (err, result) => {
                console.log(result)
            })
        })

    })
    res.send("DONE")


    let auth = new Auth({
        admin: "google-oauth2|113818401233931612247"
    })

    auth.save().then((res) => {
        console.log(res);
    })




})

module.exports = router;