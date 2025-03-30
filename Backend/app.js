const dotenv=require('dotenv');
dotenv.config();

const express=require('express');

const app=express();
const cors=require('cors')
const connecttoDb=require('./db/db');
const userRoutes=require('./routes/user.routes')
connecttoDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/users',userRoutes)

module.exports=app;