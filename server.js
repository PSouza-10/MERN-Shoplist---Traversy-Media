const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const app = express()

//Bodyparser middleware
app.use(express.json())

//DB config
const db = config.get('MongoURI');

//COnnect to db
mongoose.connect(db,{ useNewUrlParser: true,useCreateIndex: true ,useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .then( err => err ? console.log(err) : 'No errors' )

// Use items    
app.use('/api/items', items )
app.use('/api/users', users )
app.use('/api/auth', auth )

//Serve static assets in prod
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log('Server started on port ' + PORT))