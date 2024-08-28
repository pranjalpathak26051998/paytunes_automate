const express = require('express')
const create_RO = require('../src/app.js')

const app=express();
const port = 3000;

app.post('/run/create_RO', async (req, res)=>{
  
    try {
        await create_RO();
        res.send("create RO Automated file has been successfully executed");
    } catch (error) {
        console.log("the error is "+error)
        res.status(500).send(`the server error occured due to the reason ${error.message}`)
    }
});

app.listen(port, ()=>{
    console.log(`Server is running successfully on port ${port}`)
})



