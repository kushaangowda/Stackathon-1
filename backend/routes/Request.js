const router = require('express').Router();
const Request = require('../models/request');

router.route('/add').post((req,res)=>{
    let empID = req.body.empID;
    let type = req.body.type;
    let description = req.body.description;
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
            res.send({
                "message": "Request added successfully!"
            })
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

router.route('/:empID').get((req,res)=>{
    let empID = req.params.empID;
    Request.find({empID}).then(result => {
        res.send({
            "message": result
        })
    }).catch(err => {
        res.send({
            "error" : err.message
        })
    })
})


router.route('/:empID').delete((req,res)=>{
    let empID = req.params.empID;
    Request.findOneAndDelete({empID}).then(result => {
        res.send({
            "message": "Deleted:"+result
        })
    }).catch(err => {
        res.send({
            "error" : err.message
        })
    })
})

router.route('/update/:empID').put((req, res) => {
    let empID = req.params.empID;
    let type = req.body.type;
    let description = req.body.description;
    let Status = req.body.Status;
    let duration = req.body.duration;
    let request = {}
    
    if (Status)
        request['Status'] = Status;
    if (type)
        request['type'] = type;
    if (description)
        request['description'] = description;
    if (duration)
        request['duration'] = duration;
   
    Request.findOneAndUpdate({empID}, request, (err, result) => {
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