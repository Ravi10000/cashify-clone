const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// const ImageSchema = Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     image:{
//         data: Buffer,
//         contentType: String
//     }
// })

// module.exports = model('image', ImageSchema)
const productSchema = new Schema({
    brand: {
        type: String,
        // required: true,
    },
    model: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quality: {
        type: String,
        // required: true,
    },
    ram: {
        type: Number,
        // required: true,
    },
    storage: {
        type: Number,
        // required: true,
    },
    color: {
        type: String,
        // required: true,
    },
    os: {
        type: String,
        // required: true,
    },
    chipset: {
        type: String,
        // required: true,
    },
    cpu: {
        type: String,
        // required: true,
    },
    "battery capacity":{
        type: Number,
        // required: true,
    },
    camera: {
        type: [Number],
        // required: true,
    },
    gpu: {
        type: String,
        // required: true,
    },
    imageUrl:{
        type: [String]
    }
})

// productSchema.virtual('imageUrl').get(function() {
//     const images = ['front', 'back', 'side']
//     const that = this;
//     return images.map(function(img) {
//         return `images/products/${that.brand}/${that.model}/${img}.webp`
//     })
// })

module.exports = model('Product', productSchema)