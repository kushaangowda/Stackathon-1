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
        console.log('Request Added');
    })
})

router.route('/').get((req,res)=>{
        Request.find({}).then(result => {
        console.log(result);
    })
})

module.exports = router;