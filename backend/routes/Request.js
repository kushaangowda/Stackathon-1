const router = require('express').Router();
const Request = require('../models/request');

router.route('/add').post((req,res)=>{
    let empID = req.body.empid;
    let type = req.body.type;
    let description = req.body.desc;
    let duration = req.body.duration;
    let Status = "Pending";
    let request = new Request({
        empID,
        type,
        description,
        duration,
        Status
    })
    request.save().then(()=>{
        if(err){
            res.send({
                "error" : err.message
            });
        }else{
            res.send({
                "message": "Request added successfully!"
            })
        }
    }).catch(err => {
        if(err){
            res.send({
                "error" : err.message
            });
        }
    })
})

router.route('/').get((req,res)=>{
        Request.find({}).then((result,err) => {
        if(err){
            res.send({
                "error" : err.message
            });
        }else{
            if(result.length){
                res.send(result);
            }else{
                res.send({
                    "message" : "No requests currently present."
                })
            }
        }
    })
})

router.route('/:requestID').delete((req,res)=>{
    let requestID = req.params.requestID;
    Request.findByIdAndDelete({_id:requestID}).then(result => {
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