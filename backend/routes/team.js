const router = require('express').Router()
const Team = require('../models/team');


// Get Route for teams
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

router.route('/add').post((req, res) => {
    let name = req.body.name;
    let members = req.body.members;
    let team = new Team({
        name: name,
        members: members
    })

    console.log(team)

    team.save((err, result) => {
        if (err) {
            res.send({
                "error": err.message
            })
        }
        else {
            res.send({
                "result": `Created: ${result}`
            })
        }
    })
})

router.route('/delete/:teamID').delete((req, res) => {
    let teamID = req.params.teamID;
    Team.findByIdAndDelete(teamID, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                "error": err
            })
        }
        else {
            res.send({
                "result": `Deleted: ${result}`
            })
        }
    })
})

router.route('/update/:teamID').put((req, res) => {
    let teamID = req.params.teamID;
    console.log(teamID)
    let members = req.body.members;
    let name = req.body.name;

    let team = {}
    if (name)
        team['name'] = name;
    if (members)
        team['members'] = members

    Team.findByIdAndUpdate(teamID, team, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                "error": err
            })
        }
        else {
            console.log(result)
            res.send({
                "result": `Updated: ${result}`
            })
        }
        console.log("DONE")
    })
})
module.exports = router