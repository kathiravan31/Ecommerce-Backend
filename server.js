const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const router = require('./index.route');

app.use(express.json());
app.use(cors());
app.use('/api',router);

app.get('/check',(req,res)=>{
    return res.json('server is live')
})

mongoose.connect(process.env.MONGO_URL)
    .then(res=>{
        console.log('Database connected')
    })
    .catch(err=>{
        console.log(err)
    })
app.listen(process.env.PORT,()=> {
    console.log(`Server listing on ${process.env.PORT}`);

})