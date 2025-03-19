const express = require("express");
const app = express();

const PORT = 5000;

app.get('/', (req,res)=>{
    console.log('route is running!!!');
    res.send('Hello server')
})

app.get('/products', (req,res)=>{
    console.log('product route');
    res.send([{id:1, name:'product1'},{id:2, name:'product2'}])
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})