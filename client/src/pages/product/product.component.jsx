import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { selectProducts } from "../../redux/shop/shop.selectors"
import { createStructuredSelector } from "reselect"
import CustomButton from "../../components/custom-buttom/custom-button.component"
// import { useParams } from "react-router-dom"
const Productpage = ({match, history})=>{
    const {id} = match.params
    const [product, setProduct] =useState(null)
    useEffect(()=>{
        //fetch product
        (async function(){
            const res = await fetch(`/api/product/${id}`)
            const productJson = await res.json()
            setProduct(productJson)
            console.log(product);
        })()
    }, [])
    // const product = products.filter(product => product._id === id)[0]
    return(
        <div className="product w-screen mt-10 capitalize h-screen">
            <div className="device-brief flex w-full items-center justify-evenly">
            <div className="image-container w-1/3">
            <img src={product?.imageUrl[0]} alt={`${product?.brand} ${product?.model}`} />
            </div>
            <div className="info-container w-1/2 ">
                <h3 className="font-bold text-3xl">
                    {product?.brand} {product?.model} <span className="font-normal text-primary" >- refurbish {product?.quality}</span>
                    </h3>
                    <p className="font-semibold mt-2">{product?.ram}Gb/{product?.storage}Gb</p>
                    <p>{product?.color}</p>
                <p className="font-semibold text-lg mt-5 text-primary">
                    ₹ {product?.price} only 
                </p>
                <p className="units-left font-medium lowercase mb-5">
                {product?.unitsLeft === 1 
                ? <span className="text-red-500">last {product?.unitsLeft} unit left at this price</span>
                : <span className="text-orange-500">{product?.unitsLeft} units left at this price</span>
            }
                </p>
                <CustomButton>Buy Now</CustomButton>
            </div>
            </div>
            <div className="desc grid">
                {

                }
            </div>
        </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts
})

export default connect(mapStateToProps)(withRouter(Productpage))