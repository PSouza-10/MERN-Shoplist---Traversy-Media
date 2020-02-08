const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
//Item model

const User = require('../../models/User')


//register user
router.post('/', (req,res)=>{
    const {name,password,email} = req.body

    if (!name||!password||!email){
        res.status(400).send("Please fill this shit out")
    }

    User.findOne({email})
        .then(user =>{
            if (user) return res.status(400).send("Yo this guy already here")

            const newUser = new User ({
                name,
                email,
                password
            })

            bcrypt.genSalt(10,(err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        .then(New => {

                            jwt.sign(
                                {id: New.id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (err,token)=>{
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user:{
                                            id: New.id,
                                            name: New.name,
                                            email:New.email,
                                            date : New.date
                                        }
                                    })
                                }
                            )
                            
                        })
                } )
            })
        })
})



module.exports = router;