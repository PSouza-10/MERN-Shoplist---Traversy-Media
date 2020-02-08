const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
//Item model

const Item = require('../../models/Item')

//GET to api/items, GET all items
router.get('/', (req,res)=>{
    
    Item.find()
        .sort({ date : -1 })
        .then(items => res.json(items))
})

//POST to api/items, POST a new doc/item
router.post('/', auth, (req,res)=>{
    
    const newItem = new Item({
        name :  req.body.name
    })
    
    newItem.save().then(item => res.json(item))
})

//DELETE to api/items/:id, DELETES item
router.delete('/:id',auth, (req,res)=>{
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=> res.send( 'ID : ' + req.params.id + ' Deleted')))
        .catch(err => res.status(404).send('Failed, no ID'))
})

module.exports = router;