import './product.styles.scss'
import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import CustomButton from "../../components/custom-buttom/custom-button.component"
import { selectProducts } from "../../redux/shop/shop.selectors"
import {selectCurrentUser} from '../../redux/user/user.selectors'
// import { useParams } from "react-router-dom"
const Productpage = ({match, history, currentUser})=>{
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

    const handleClick = ()=>{
        if(currentUser){
            (currentUser.name && currentUser.address) 
            ? history.push(`/checkout/${product?._id}`)
            : history.push('/profile')
        }else{
            history.push('/signin')
        }
        // axios.post('/api/user/generateorder', {
        //     productId: product?._id
        // })
    }
    return(
        <div className="product-page">
            <div className="container">
                <div className="image-container">
                    <img src={product?.imageUrls[0]} alt={`${product?.brand} ${product?.model}`} />
                </div>
                <div className="info-container">
                    <h3 className="name">
                        {product?.brand} {product?.model} <span>- refurbish {product?.quality}</span>
                        </h3>
                        <p className="ram-storage">{product?.ram}Gb/{product?.storage}Gb</p>
                        <p>{product?.color}</p>
                        <p>{product?.quality} Quality</p>
                    <p className="price">
                        ₹ {product?.price} only 
                    </p>
                    <p className="units-left">
                    {product?.units === 1 
                    ? <span>last {product?.units} unit left at this price</span>
                    : <span>{product?.units} units left at this price</span>
                }
                    </p>
                    <div className="button-container">
                    <CustomButton onClick={handleClick}>Buy Now</CustomButton>
                    </div>
                </div>
                
            </div>
            <div className="description-container">
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
        </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(withRouter(Productpage))