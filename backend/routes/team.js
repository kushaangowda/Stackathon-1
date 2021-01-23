const router = require('express').Router()
const Team = require('../models/team');
const Employee = require('../models/employee');
const axios = require('axios').default;

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

router.route('/removeFromAll/:empID').get((req, res) => {
    let empid = req.params.empID;
    Team.find({}).then(result => {
        // console.log(result)
        result.forEach(team => {
            axios.get(`https://api-stackathon.herokuapp.com/team/removemember/${team._id}/${empid}`).then(r => {
                console.log(r.data.message)
            })
        })
        res.send(`${empid} removed from all teams`)
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
            members.forEach(async (item) => {
                await Employee.updateOne({ _id: item }, { $set: { teamID: team._id } }, (err) => {
                    if (err) {
                        res.send({
                            "error": err.message
                        })
                    }
                })
            })
            res.send({
                "result": `Created: ${result}`
            })

        }
    })
})

router.route('/delete/:teamID').delete(async (req, res) => {
    let teamID = req.params.teamID;
    await Employee.updateMany({ teamID }, { $set: { teamID: 0 } });
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
    Employee.updateMany({ teamID }, { $set: { teamID: 0 } }).then(() => {
        Team.findByIdAndUpdate(teamID, team, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    "error": err
                })
            }
            else {
                console.log(result)
                members.forEach(async (item) => {
                    await Employee.updateOne({ _id: item }, { $set: { teamID } });
                })
                res.send({
                    "result": `Updated: ${result}`
                })
            }
            console.log("DONE")
        })
    })

})

router.route('/addmember/:teamID/:empID').get((req, res) => {
    let teamid = req.params.teamID;
    let empid = req.params.empID;
    Team.findOneAndUpdate({ _id: teamid }, { $push: { members: empid } }, (err, result) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            Employee.findByIdAndUpdate(empid, { $set: { teamID: teamid } }, (err2, result) => {
                if (err2) {
                    res.send({
                        "error": err2.message
                    })
                } else {
                    res.send({
                        "message": "Added " + empid + " to " + teamid
                    })
                }
            })
        }

    })
})

router.route('/removemember/:teamID/:empID').get((req, res) => {
    let teamid = req.params.teamID;
    let empid = req.params.empID;
    Team.findOneAndUpdate({ _id: teamid }, { $pull: { members: empid } }, (err, result) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            res.send({
                "message": `${empid} removed from ${teamid}`
            })
        }

    })
})


module.exports = router
