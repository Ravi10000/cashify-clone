import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { selectProducts } from "../../redux/shop/shop.selectors"
import { createStructuredSelector } from "reselect"
// import { useParams } from "react-router-dom"
const Productpage = ({match, history, products})=>{
    const {id} = match.params
    const product = products.filter(product => product._id === id)[0]
    return(
        <div className="product w-screen">
            <div className="image-container">
            <img src={product.imageUrl[0]} alt={`${product.brand} ${product.model}`} />
            </div>
            <div className="info-container">
                
            </div>
        </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts
})

export default connect(mapStateToProps)(withRouter(Productpage))