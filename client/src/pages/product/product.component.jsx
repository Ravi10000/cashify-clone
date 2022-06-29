import './product.styles.scss'
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
            const res = await fetch(`/api/products/${id}`)
            const productJson = await res.json()
            setProduct(productJson)
        })()
    }, [setProduct, id])
    return(
        <div className="product-page w-screen mt-10 capitalize h-screen">
            <div className="device-brief flex w-full items-center justify-evenly">
            <div className="image-container w-1/3">
            <img src={product?.imageUrls[0]} alt={`${product?.brand} ${product?.model}`} />
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
                {product?.units === 1 
                ? <span className="text-red-500">last {product?.units} unit left at this price</span>
                : <span className="text-orange-500">{product?.units} units left at this price</span>
            }
                </p>
                <CustomButton>Buy Now</CustomButton>
            </div>
            </div>
            <h3>Description</h3>
            {
                product 
                && <div className="desc">
                <p>brand</p>
                <p>{product.brand}</p>
                <p>model</p>
                <p>{product.model}</p>
                <p>ram</p>
                <p>{product.ram}Gb</p>
                <p>storage</p>
                <p>{product.storage}Gb</p>
                <p>color</p>
                <p>{product.color}</p>
                <p>price</p>
                <p>{product.price} rs</p>
                <p>quality</p>
                <p>{product.quality}</p>
                <p>battery capacity</p>
                <p>{product["battery capacity"]} mAh</p>
            </div>
            }
        </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts
})

export default connect(mapStateToProps)(withRouter(Productpage))