const router = require('express').Router()
const { now } = require('mongoose');
const Attendance = require('../models/attendance');

// 5ff024fac4cba31b2ca6b993

router.route('/').get((req, res) => {
    Attendance.find({}, (err, result) => {

        if (err) {
            result = {
                "error": err.message
            }
            res.send(result)
        }
        else {
            if (!result) {
                result = {
                    "error": "No team present with this ID"
                }
            }
            res.send(result)
        }
    })
})


router.route('/clear').get((req, res) => {
    Attendance.find({}, (err, result) => {
        result.forEach(item => {
            Attendance.findByIdAndDelete(item["_id"], (err, result) => {
                console.log(result)
            })
        })

    })
    res.send("DONE")
})

router.route('/:empID').get(
    (req, res) => {
        Attendance.findOne({ empID: req.params.empID }, (err, result) => {
            if (err) {
                result = {
                    "error": err.message
                }
                res.send(result)
            }
            else {
                if (!result) {
                    result = {
                        "error": "No employee present with this ID"
                    }
                }
                res.send(result)
            }
        })

    })

router.route('/:empID/create').get((req, res) => {

    Attendance.findOne({ empID: req.params.empID }, (err, result) => {
        if (err) {
            result = {
                "error": err.message
            }
            res.send(result)
        }
        else {
            var today = new Date().toString()
            if (!result) {
                let attendance = new Attendance({
                    empID: req.params.empID,
                    attendance: [today]
                })
                attendance.save((err, result) => {
                    if (err) {
                        res.send({
                            "error": err.message
                        })
                    }
                    else {
                        res.send({
                            "result": result
                        })
                    }
                })
            }

            else {
                const thisAttendance = result['attendance']
                let present = false
                thisAttendance.forEach(day => {
                    if (day.slice(0, 15) == today.slice(0, 15)) {
                        present = true;
                        return;
                    }
                })
                console.log(present)

                if (present) {
                    res.send({
                        "message": "This Employee is already present"
                    })
                }
                else {
                    Attendance.findOneAndUpdate(
                        { empID: req.params.empID },
                        { $push: { attendance: today } },
                        (err, result) => {
                            if (err) {
                                res.send({
                                    "error": err.message
                                })
                            }
                            else {
                                res.send({
                                    "result": result
                                })
                            }
                        }
                    )
                }

            }

        }
    })
})


module.exports = router