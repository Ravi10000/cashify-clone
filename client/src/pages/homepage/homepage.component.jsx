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

const Homepage = ({products, fetchProducts})=>{
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage))