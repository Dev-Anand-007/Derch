const mongoose=require('mongoose');
const productModel = require('./product-model');

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        minLength:3 ,
        maxLength:50,
        trim: true,
        required: true,    
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        
    }],
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    contact: {
        type:Number,
        
    },
    picture: String,
});

//implementing index email is left

module.exports=mongoose.model('user',userSchema);