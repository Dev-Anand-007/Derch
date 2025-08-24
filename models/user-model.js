const constant=require('../utils/constants')

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        
    },
    email: String,
    password:String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type:Array,
        defaut: [],
    },
    contact: Number,
    picture: String,
});

module.exports=mongoose.model('user',userSchema);