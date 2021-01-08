const router = require('express').Router();
const Request = require('../models/payrollRequest');

router.route('/add').post((req,res)=>{
    let empID = req.body.empID;
    let description = req.body.description;
    let Status = "Pending";
    let request = new Request({
        empID,
        description,
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
                res.send(result);
        }
    })
})

router.route('/:empID').get((req,res)=>{
    let empID = req.params.empID;
    Request.find({empID}).then(result => {
        res.send(result)
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
    let description = req.body.description;
    let Status = req.body.Status;
    let request = {}
    
    if (Status)
        request['Status'] = Status;
    if (description)
        request['description'] = description;
    
   
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