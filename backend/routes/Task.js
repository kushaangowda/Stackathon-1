const router = require('express').Router();
const Task = require('../models/task');

router.route('/add').post((req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let deadline = req.body.deadline;
    let teamID = req.body.teamID;
    let status = 0;
    let task = new Task({
        name,
        description,
        deadline,
        teamID,
        status
    })
    task.save().then(() => {
        console.log('Task Added');
        res.send({
            "message": "Task Added successfully!"
        })
    }).catch(err => {
        if (err) {
            res.send({
                "error": err.message
            })
        }
    })
})

router.route('/').get((req, res) => {
    Task.find({}).then((result, err) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            if (result.length) {
                res.send(result);
            } else {
                res.send({
                    "message": "No tasks currently present."
                })
            }
        }
    })
})

router.route('/:teamID').get((req, res) => {
    let teamID = req.params.teamID;
    Task.find({ teamID }).then(result => {
        if (result) {
            res.send(result);
        } else {
            res.send({
                "error": "No Task presesnt with the given team ID"
            });
        }
    }).catch(err => {
        res.send({
            "err": err.message
        })
    })
})

router.route('/:taskID').delete((req, res) => {
    let taskID = req.params.taskID;
    Task.findByIdAndDelete({ _id: taskID }).then(result => {
        res.send({
            "message": "Deleted:" + result
        })
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})

router.route('/update/:taskID').put((req, res) => {
    let taskID = req.params.taskID;
    let name = req.body.name;
    let description = req.body.description;
    let deadline = req.body.deadline;
    let teamID = req.body.teamID;
    let status= req.body.status;
    let task = {}
    if (name)
        task['name'] = name;
    if (description)
        task['description'] = description;
    if (deadline)
        task['deadline'] = deadline;
    if (teamID)
        task['teanID'] = teamID;
    if(status)
        task['status'] = status;
    Task.findByIdAndUpdate(taskID, task, (err, result) => {
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

module.exports = router;