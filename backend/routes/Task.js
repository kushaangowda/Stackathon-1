const router = require('express').Router();
const Task = require('../models/task');

router.route('/add').post((req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let deadline = req.body.deadline;
    let taskID = req.body.taskID;
    let task = new Task({
        name,
        description,
        deadline,
        taskID
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
            if(result.length){
                res.send(result);
            }else{
                res.send({
                    "message" : "No tasks currently present."
                })
            }
        }
    })
})

router.route('/:taskID').get((req, res) => {
    let taskID = req.params.taskID;
    Task.find({ taskID }).then(result => {
        if (result) {
            res.send(result);
        } else {
            res.send({
                "error": "No Task presesnt with the given ID"
            });
        }
    }).catch(err => {
        res.send({
            "err": err.message
        })
    })
})

router.route('/:taskID').delete((req,res)=>{
    let taskID = req.params.taskID;
    Task.findByIdAndDelete({_id:taskID}).then(result => {
        res.send({
            "message": "Deleted:"+result
        })
    }).catch(err => {
        res.send({
            "error" : err.message
        })
    })
})

module.exports = router;