const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //Check token
    if(!token) res.status(401).send("No token, auth denied")//Unauthorized

    
    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //add user from payload
        req.user = decoded
        next()
        
    }catch(e){
        res.status(400).send('invalid token')
    }
    
}

module.exports = auth