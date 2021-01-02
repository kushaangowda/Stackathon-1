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
    Team.findOne({}).then(result => {
        console.log(result)
        res.send("DONE")
    })
})

module.exports = router