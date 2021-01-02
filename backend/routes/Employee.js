const router = require('express').Router();
const Employee = require('../models/employee');

router.route('/add').post((req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let emp = new Employee({
        name,
        email
    })
    emp.save().then(() => {
        console.log('Employee Added');
    }).catch(err => {
        res.send({
            "error": err.message
        });
    })


})

router.route('/').get((req, res) => {
    Employee.find({}).then(result => {
        console.log(result);
        res.send(result)
    })
})

router.route('/:email').get((req, res) => {
    let email = req.params.email;

    Employee.findOne({ email }).then(result => {
        if (result) {
            console.log(result);
            res.send("MIL GAYA");
        } else {
            let result = {
                "error": "No Employee present with the given email"
            }
            res.send(result);
        }
    }).catch(err => {
        res.send({
            "err": err.message
        })
    })
})

module.exports = router;