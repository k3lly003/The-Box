const express = require ('express') 
const pool = require('./db')
const port = 1337

const app = express()
app.use(express.json) // this is gonna allow us the receive json data

// ROUTES
app.use('/', (req,res)=>{
    res.sendStatus(200)
})

app.use('/', (req,res)=>{
    const {name, location} = req.body
    res.status(200).send({
        message: `YOUR KEYS WERE ${name}, ${location}`
    })
})






app.listen(port, ()=> console.log(`SERVER'S RUNNING ON PORT ${port}`))