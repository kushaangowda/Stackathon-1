const router = require('express').Router();
const WannabeEmployee = require('../models/wannabeEmployee')




router.route('/').get((req, res) => {
    WannabeEmployee.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})


router.route('/new').post((req, res) => {
    let name = req.body.name;
    let nickname = req.body.nickname
    let email = req.body.email;
    let picture = req.body.picture;
    let sub = req.body.sub;


    let newEmployee = new WannabeEmployee({
        name,
        nickname,
        email,
        picture,
        sub
    })
    newEmployee.save().then((result) => {
        res.send({
            "result": result,
            "message": "New Temporary Employee created"
        })
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})

router.route("/remove/:sub").get((req, res) => {
    let sub = req.params.sub;
    WannabeEmployee.findOneAndDelete(
        { sub: sub },
        (err, result) => {
            if (err)
                res.send(err)
            else
                res.send(result)
        }
    )
})

router.route("/clear").get((req, res) => {
    WannabeEmployee.find({}, (err, result) => {
        result.forEach(item => {
            WannabeEmployee.findByIdAndDelete(item["_id"], (err, result) => {
                console.log(result)
            })
        })
    })
    res.send("Cleared")
})



module.exports = router;
