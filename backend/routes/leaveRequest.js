const router = require('express').Router();
const Request = require('../models/leaveRequest');

router.route('/add').post((req, res) => {
    let empID = req.body.empID;
    let description = req.body.description;
    let duration = req.body.duration;
    let start = req.body.start;
    let Status = "Pending";
    let request = new Request({
        empID,
        description,
        start,
        duration,
        Status
    })
    request.save().then(() => {
        res.send({
            "message": "Request added successfully!"
        })
    }).catch(err => {
        if (err) {
            res.send({
                "error": err.message
            });
        }
    })
})

router.route('/').get((req, res) => {
    Request.find({}).then((result, err) => {
        if (err) {
            res.send({
                "error": err.message
            });
        } else {
            res.send(result);

        }
    })
})

router.route('/:empID').get((req, res) => {
    let empID = req.params.empID;
    Request.find({ empID }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})


router.route('/:id').delete((req, res) => {
    let id = req.params.id;
    Request.findByIdAndDelete(id).then(result => {
        res.send({
            "message": "Deleted:" + result
        })
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})

router.route('/update/:id').put((req, res) => {
    let id = req.params.id;
    let description = req.body.description;
    let Status = req.body.Status;
    let start = req.body.start;
    let duration = req.body.duration;
    let request = {}

    if (Status)
        request['Status'] = Status;
    if (start)
        request['start'] = start;
    if (description)
        request['description'] = description;
    if (duration)
        request['duration'] = duration;

    Request.findByIdAndUpdate(id, request, (err, result) => {
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

router.route('/:id/accept').get((req, res) => {
    let id = req.params.id;
    let host = process.env.HOST;
    Request.findByIdAndUpdate(id, { $set: { Status: "Accepted" } }, (err) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            res.send(
                'Accepted'
            );
        }
    })
})

router.route('/:id/reject').get((req, res) => {
    let id = req.params.id;
    let host = process.env.HOST;
    Request.findByIdAndUpdate(id, { $set: { Status: "Rejected" } }, (err) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            res.send('Rejected');
        }
    })
})



module.exports = router;