const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
//User model

const User = require('../../models/User')


//post
router.post('/', (req,res)=>{
    const {password,email} = req.body

    if (!password||!email){
        res.status(400).send("Please fill this shit out")
    }

    User.findOne({email})
        .then(user =>{
            if (!user) return res.status(400).json({msg:"Yo this guy aint here"})

            //VAlidate password
            
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                   if (!isMatch) return res.status(400).json('Invalid Credentials')
                    
                   jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 60},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            sendUser:{
                                id: user.id,
                                name: user.name,
                                email:user.email
                                
                            }
                        })
                    }
                )
            })

            
        })
})

// GET api/auth/user
router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id).select('-password')
    .then(user => res.json(user))
})

module.exports = router;