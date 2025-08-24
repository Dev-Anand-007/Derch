const mongooose=require('mongoose');

const productSchema=mongooose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
    
})

module.exports=mongoose.model('product',productSchema);


