const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const badyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors');
const expressValidator = require('express-validator')
require('dotenv').config();

// import routes DB
const authRoutes =require('./routes/auth')
const userRoutes =require('./routes/user')
const categoryRoutes =require('./routes/category')
const productRoutes =require('./routes/product')


const app =express();
//middlewores
app.use(morgan('dev'));
app.use(badyparser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(cors());
//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=>console.log('DB connect'))


// router DB
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log( `localhost:${port}`)
})