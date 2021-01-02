const router = require('express').Router();
const Employee = require('../models/employee');

router.route('/add').post((req,res)=>{
        let email = req.body.email;
        let name =  req.body.name;
        let teamID = req.body.teamID;
        let Role = req.body.Role;
        let Post = req.body.Post;
        let Salary = req.body.Salary;
        let attendance=0;
        let emp = new Employee({
            email,
            name,
            teamID,
            Role,
            Post,
            Salary,
            attendance
        })
        emp.save().then((result)=>{
            res.send({
                "message":"Employee added"+ result
            })
        }).catch(err => {
            res.send({
                "error" : err.message
            });
        })
        
    
    })

router.route('/').get((req,res)=>{
    Employee.find({}).then(result => {
        if(result.length){
            res.send(result);
        }else{
            res.send({
                "message": "No Employees found"
            })
        }
    })
})

router.route('/:email').get((req,res)=>{
    let email = req.params.email;
    
        Employee.findOne({email}).then(result => {
            if(result){
                res.send({
                    "message" : result
                });
            }else{
                let result = {
                    "error" : "No Employee present with the given email"
                }
                res.send(result);
            }
        }).catch(err => {
            res.send({
                "err" : err.message
            })
        })
})

router.route('/:empID').delete((req,res)=>{
    let empID = req.params.empID;
    Employee.findByIdAndDelete({_id:empID}).then(result => {
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