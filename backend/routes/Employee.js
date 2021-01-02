const router = require('express').Router();
const Employee = require('../models/employee');

router.route('/add').post((req,res)=>{
    let email = req.body.email;
    let name =  req.body.name;
    let emp = new Employee({
        name,
        email
    })
    emp.save().then(()=>{
        console.log('Employee Added');
    })
})

router.route('/').get((req,res)=>{
    Employee.find({}).then(result => {
        console.log(result);
    })
})

module.exports = router;