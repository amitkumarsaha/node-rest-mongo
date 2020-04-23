let CustomerModel = require('../models/customer.model')
let express = require('express')
let router = express.Router()

//Create a new customer
router.post('/customer', (req, resp) =>{
    if(!req.body){
        return resp.status(400).send('Request body is missing')
    }

    let model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return resp.status(500).send(doc)
            }
            resp.status(201).send(doc)
        })
        .catch(err => {
            resp.status(500).json(err)
        })
})

// GET ALL
router.get('/customer', (req,resp)=>{
    
    CustomerModel.find().then(doc=>{
        resp.json(doc)
    }).catch(err=>{
        resp.status(500).json(err)
    })
})

// GET
router.get('/customer', (req,resp)=>{
    if(!req.query.email){
        return resp.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOne({
        email: req.query.email
    }).then(doc=>{
        resp.json(doc)
    }).catch(err=>{
        resp.status(500).json(err)
    })
})

// UPDATE
router.put('/customer', (req,resp)=>{
    if(!req.query.email){
        return resp.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndUpdate({
        email: req.query.email
    },req.body,{
        new: true
    })
    .then(doc=>{
        resp.json(doc)
    })
    .catch(err=>{
        resp.status(500).json(err)
    })
})

// DELETE
router.delete('/customer', (req,resp)=>{
    if(!req.query.email){
        return resp.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc=>{
        resp.json(doc)
    })
    .catch(err=>{
        resp.status(500).json(err)
    })
})

module.exports = router;