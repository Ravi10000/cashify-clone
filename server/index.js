const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const Product = require('./models/product.model');

const app = express();
const dbUrl = 'mongodb://localhost:27017/cashify-clone';

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', ()=>{
    console.log('connection successful')
})

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('public'))
app.use('/images', express.static(__dirname + '/images'))
// app.post('/post', (req, res)=>{
//     console.log('connected to react')
//     res.redirect('/')
// })
// const filter = {
//     id: "6297829c3955c8eb4f1ba64e"
// }
// const update = {
//     imageUrl: '/images/apple-iphone-7.webp'
// }
// Product.findOneAndUpdate(filter, update)
// .then(res => console.log(res))
// .catch(err => console.error(err))

async function addData(){
    const newProduct = await Product.create({
        brand: 'apple',
        model: 'iphone-7',
        price: 17000,
        quality: 'good'
    })
    await newProduct.save(()=>{
        console.log('saved')
    })
}
// addData()

app.get('/api/products', async(req, res)=>{
    const products = await Product.find({})
    const newProducts = await products.map(product => {
        return {...product, imageUrl: product.imageUrl}
    })
    console.log(newProducts)
    res.send(newProducts)
})

// app.get('/img', async(req, res)=> {
//     res.send()
// })
// app.get('/create', async(req, res)=>{
//     const newProduct = new Product({
//         brand: 'apple',
//         model: 'iphone 13',
//         price: '68000',
//      })
//      await newProduct.save()
//      res.redirect('/')
// })

app.listen(5000, ()=>{
    console.log('listening for requests on port 5000')
})