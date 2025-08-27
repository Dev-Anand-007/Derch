const express=require('express');
const app=express();

// const cookieParser=require('cookie-parser');
const path=require('path');
const db =require('./config/mongoose-conntection');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

//routes
const authRouter=require('./routes/authRouter');
const adminRouter=require('./routes/adminRouter');
const usersRouter=require('./routes/usersRouter');




app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(express.static(path.join(__dirname+'public')));
app.set('view engine','ejs')

app.use('/auth',authRouter)
app.use('/admin',adminRouter);
app.use('/',usersRouter);



app.listen(3000);