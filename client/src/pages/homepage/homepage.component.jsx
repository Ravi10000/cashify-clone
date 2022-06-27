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
                Buy your dream 
                <span>smartPhones</span> 
                <br/> 
                with our low 
                <span>prices</span>
            </h3>
        </div>
        <div className="device-list">
            <h2 className="title">Refurbished Smartphones</h2>
            <CardList products={products} />
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