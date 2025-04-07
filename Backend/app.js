const dotenv=require('dotenv');
dotenv.config();

const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const cors=require('cors')
const connecttoDb=require('./db/db');
const userRoutes=require('./routes/user.routes')
const captainRoutes=require('./routes/captain.routes');
connecttoDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/users',userRoutes)
app.use('/captains',captainRoutes);

module.exports=app;