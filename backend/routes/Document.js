const router = require('express').Router();
const Document = require('../models/document');

router.route('/add').post((req, res) => {
    let name = req.body.name;
    let link = req.body.link;
    let document = new Document({
        name,
        link
    })
    document.save().then(() => {
        console.log('Document Added');
        res.send({
            "message": "Document Added successfully!"
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
    Document.find({}).then((result, err) => {
        if (err) {
            res.send({
                "error": err.message
            })
        } else {
            if (result.length) {
                res.send(result);
            } else {
                res.send({
                    "message": "No documents currently present."
                })
            }
        }
    })
})

router.route('/update/:id').put((req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let link = req.body.link;
    let doc = {};
    if(name)
        doc.name = name;
    if(link)
        doc.link = link;   
    Document.findByIdAndUpdate(id, doc , (err)=> {
        if(err) {
            res.send({
                "error" : err.message
            })
        }else{
            res.send({
                "message" : "Document Updated!"
            })
        }
    })
})

router.route('/:id').delete((req, res) => {
    let id = req.params.id;
    Document.findByIdAndDelete(id).then(result => {
        res.send({
            "message": "Deleted:" + result
        })
    }).catch(err => {
        res.send({
            "error": err.message
        })
    })
})

module.exports = router;