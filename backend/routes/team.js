const router = require('express').Router()
const Team = require('../models/team');





router.route('/add').post((req, res) => {
    let name = req.body.name;
    let members = [];
    let team = new Team({
        name: name,
        members: members
    })

    team.save().then(() => {
        console.log("ADDED")
        res.send("DONE")
    })
})

router.route('/').get((req, res) => {
    Team.find({}, (err, result) => {

        if (err) {
            result = {
                "error": err.message
            }
            res.send(result)
        }
        else {
            if (!result) {
                result = {
                    "error": "No team present with this ID"
                }
            }
            res.send(result)
        }
    })
})

router.route('/:teamID').get(
    (req, res) => {
        Team.findById(req.params.teamID, (err, result) => {
            if (err) {
                result = {
                    "error": err.message
                }
                res.send(result)
            }
            else {

                console.log(result)
                if (!result) {
                    result = {
                        "error": "No team present with this ID"
                    }
                }
                res.send(result)
            }
        })
    })
module.exports = router