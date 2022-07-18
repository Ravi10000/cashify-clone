import './product.styles.scss'
import { useEffect, useState } from "react"
import axios from 'axios'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {selectCurrentUser} from '../../redux/user/user.selectors'
import { selectProducts } from "../../redux/shop/shop.selectors"
import CustomButton from "../../components/custom-buttom/custom-button.component"
import ImagesCarousel from '../../components/carousel/carousel.component'
import Loader from '../../components/loader/loader.component'
// import { useParams } from "react-router-dom"
const Productpage = ({match, history, currentUser})=>{
    const {id} = match.params
    const [product, setProduct] =useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    let isOutOfStock = false
    if(product?.units === 0) isOutOfStock = true
    useEffect(()=>{
        //fetch product
        (async function(){
            const res = await axios.get(`/api/products/${id}`)
            setProduct(res.data)
            setIsFetching(false)
        })()
    }, [setProduct, id])
    console.log(product)

    const handleClick = ()=>{
        setIsLoading(true)
        if(!currentUser){
            history.push('/signin')
            return
        }
        (currentUser.name && currentUser.address) 
        ? history.push(`/checkout/${product?._id}`)
        : history.push({
            pathname: '/edit-profile',
            state: {
                msg: 'INCOMPLETE PROFILE! | Please fill your name and address before checkout',
                OnCompleteRedirect: `/checkout/${product?._id}`
            }
        })
    }  
    const loaderStyles = isFetching
    ? { display: "flex", justifyContent: "center", alignItems: "center" }
    : {};
    return(
        <div className="product-page" style={loaderStyles}>
            {
                isFetching ?
                <Loader/>
                :
                <>
                <div className="container">
                <div className="image-container">
                {product?.images.length > 1
                    ?
                    <ImagesCarousel images={product?.images}/>
                    : <img src={product?.images[0].url} alt="product"/>
                }
                </div>
                <div className="info-container">
                    <h3 className="name">
                        {product?.brand} {product?.model} <span>- refurbish {product?.quality}</span>
                        </h3>
                        <p className="ram-storage">{product?.ram}Gb/{product?.storage}Gb</p>
                        <p><div style={{display: 'inline-block', backgroundColor: product?.color, width: '20px', height: '20px', borderRadius: '2px', marginBottom: '-5px'}}></div> {product?.color} </p>
                        <p>{product?.quality} Quality</p>
                    <p className="price">
                        ₹ {product?.price} only 
                    </p>
                    <p className="units-left">
                    {
                    isOutOfStock
                    ? <span style={{color: '#ef233c'}}>Out of stock</span> 
                    : (product?.units === 1) 
                    ? <span>last {product?.units} unit left at this price</span>
                    : <span>{product?.units} units left at this price</span>
                }
                    </p>
                    {
                        !isOutOfStock &&
                        <div className="button-container">
                    <CustomButton onClick={handleClick} isLoading={isLoading && true}>Buy Now</CustomButton>
                    </div>
                    }
                </div>
                
            </div>
            {
                product?.message && 
                <div className="message">
                    <h3>Warning Message: </h3>
                    <p>{product?.message}</p>
                </div>
            }
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
                <p>operating system</p>
                <p>{product.os}</p>
                <p>color</p>
                <p><div style={{display: 'inline-block', backgroundColor: product?.color, width: '20px', height: '20px', borderRadius: '2px', marginBottom: '-5px'}}></div> {product.color}</p>
                <p>price</p>
                <p> {product.price} rs</p>
                <p>quality</p>
                <p> {product.quality}</p>
                <p>battery capacity</p>
                <p> {product["battery capacity"]} mAh</p>
                <p>front camera</p>
                <p>{product["front camera"]}</p>
                <p>rear camera</p>
                <p>{product["back camera"]}</p>
                <p>chipset</p>
                <p>{product.chipset}</p>
                <p>cpu info</p>
                <p>{product.cpu}</p>
                <p>gpu info</p>
                <p>{product.gpu}</p>
            </div>
            }
            </div>
</>
            }
        </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(withRouter(Productpage))