// const { drop } = require('lodash');
const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:40
    },
    description:{
        type: String,
        required: true,
        maxlength:40
    },
    price:{
        type: Number,
        trim: true,
        required: true,
        maxlength:40
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required: true    
    },
    quantity:{
        type: Number
    },
    sold:{
        type: Number,
        default:0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

},
{timestamps:true}
);


 module.exports = mongoose.model('Product',productSchema)