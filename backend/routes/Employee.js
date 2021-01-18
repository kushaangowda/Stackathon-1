const router = require('express').Router();
const Employee = require('../models/employee');

router.route('/add').post((req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let Role = req.body.Role;
    let Post = req.body.Post;
    let Salary = req.body.Salary;
    let attendance = 0;
    let teamID = req.body.teamID || 0;
    let emp = new Employee({
        email,
        name,
        Role,
        Post,
        Salary,
        attendance,
        teamID
    })
    emp.save().then((result) => {
        res.send({
            "result": result,
            "message": "Employee Added!!"
        })
    }).catch(err => {
        res.send({
            "error": err.message
        });
    })


})

router.route('/').get((req, res) => {
    Employee.find({}).then(result => {
        if (result.length) {
            res.send(result);
        } else {
            res.send({
                "message": "No Employees found"
            })
        }
    })
})

router.route('/email/:email').get((req, res) => {
    let email = req.params.email;

    Employee.findOne({ email }).then(result => {
        if (result) {
            res.send({
                "message": result
            });
        } else {
            let result = {
                "error": "No Employee present with the given email"
            }
            res.send(result);
        }

    }
    ).catch(err => {
        res.send({
            "err": err.message
        })
    })
})


router.route('/id/:empid').get((req, res) => {
    let empid = req.params.empid;

    Employee.findById(empid).then(result => {
        if (result) {
            res.send({
                "data": result
            });
        } else {
            let result = {
                "error": "No Employee present with the given ID"
            }
            res.send(result);
        }

    }
    ).catch(err => {
        res.send({
            "err": err.message
        })
    })
})

router.route('/:empID').delete((req, res) => {
    let empID = req.params.empID;
    Employee.findByIdAndDelete({ _id: empID }).then(result => {
        res.send({
            "message": "Deleted:" + result
        })
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})

router.route('/update/:empID').put((req, res) => {
    let empID = req.params.empID;
    console.log(empID)
    let email = req.body.email;
    let name = req.body.name;
    let Role = req.body.Role;
    let Post = req.body.Post;
    let Salary = req.body.Salary;
    let TeamID = req.body.teamID || 0;
    let emp = {}
    if (name)
        emp['name'] = name;
    if (email)
        emp['email'] = email;
    if (Role)
        emp['Role'] = Role;
    if (Post)
        emp['Post'] = Post;
    if (Salary)
        emp['Salary'] = Salary;
    if (TeamID)
        emp['teamID'] = TeamID;

    Employee.findByIdAndUpdate(empID, emp, (err, result) => {
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