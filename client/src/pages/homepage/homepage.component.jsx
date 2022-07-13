// styles import
import './homepage.styles.scss'

//react imports
import { useEffect } from "react"

//statefulness imports
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectProducts } from '../../redux/shop/shop.selectors'
import { fetchProductsStart } from '../../redux/shop/shop.actions'

//component imports
import CardList from "../../components/card-list/card-list.component"

//router imports
import { withRouter } from "react-router-dom";

const Homepage = ({products, fetchProducts, history})=>{
    console.log('homepage history', history)
    useEffect(()=>{
        fetchProducts()
      }, [fetchProducts])
    return(
    <div className="homepage">
        <div className="banner">
            <h1 className="title">
                <span className="">Mr.</span>
                Phone
                <span className="">X</span>
            </h1>
            <h3 className="subtitle">
                Buy your  
                <span>dream smartPhones</span> 
                <br/> 
                with our  
                <span>low prices</span>
            </h3>
        </div>
        <div className="device-list">
            <h2 className="title">For Sale</h2>
            <h2 className="subtitle">Refurbished Smartphones</h2>
            <div className="card-list-container">
            <CardList products={products} />
            </div>
            <div className="quality-description">
                <h3>Quality Descriptions</h3>
                <p><span>Superb: </span>Almost new devices with warrenty of 6 months from our side.</p>
                <p><span>Best: </span>Devices in great condition with warrenty of 3 months from our side.</p>
                <p><span>Good: </span>Devices in okay condition with warrenty of 1 and 1/2 months from our side.</p>
                <p><span>Not Bad: </span>Devices that have some issue with warrenty of 1 month from our side.</p>
            </div>
        </div>
    </div>
)}

// connecting to store
const mapStateToProps = createStructuredSelector({
    products: selectProducts,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: ()=> dispatch(fetchProductsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)