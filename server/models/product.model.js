const mongoose = require('mongoose');
const {Schema, model} = mongoose;


function screenSizeArrayLimit(val) {
    return val.length === 2;
  }

  function aspectRatioArrayLimit(val) {
    return val.length === 2;
  }

  

const productSchema = new Schema({
    announcedOn: {
      type: String,
      require: true,  
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // imageUrl: String,
    quality: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 100,
        max: 300,
    },
    colors: {
        type: [String],
        required: true,
    },
    build: {
        type: String,
        required: true,
    },
    waterResistance: {
        type: String,
        required: true,
    },
    SARValue: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },
    screenType: {
        type: String,
        required: true,
    },
    screenSize: {
        type: [Number],
        required: true,
        validate: [screenSizeArrayLimit, 'only height and width is required!']
    },
    pixelDensity: {
        type: Number,
        required: true,
    },
    screenProtection: {
        type: Boolean,
        required: true,
    },
    aspectRatio: {
        type: [Number],
        required: true,
        validate: [aspectRatioArrayLimit, 'only height and width is required!']
    },
    peakBrightness: {
        type: Number,
        required: true,
    },
    screenQuality: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        required: true,
    },
    chipset: {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    clockSpeed: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
    },
    architecture: {
        type: Number,
        required: true,
    }
    

})

productSchema.virtual('imageUrl').get(function() {
    const images = ['front', 'back', 'side']
    const that = this;
    return images.map(function(img) {
        return `images/products/${that.brand}/${that.model}/${img}.webp`
    })
})

module.exports = model('Product', productSchema)