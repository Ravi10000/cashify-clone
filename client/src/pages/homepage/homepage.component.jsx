import { useEffect } from "react"
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectProducts } from '../../redux/shop/shop.selectors'
import { fetchProductsStart } from '../../redux/shop/shop.actions'
import CardList from "../../components/card-list/card-list.component"
import { withRouter } from "react-router-dom";
const Homepage = ({products, fetchProducts})=>{
    useEffect(()=>{
        fetchProducts()
      }, [fetchProducts])
    return(
    <div className="homepage text-center">
        <div className="banner width-full relative">
        <img src="banner.webp" alt="" className="w-screen h-screen"/>
        <h1 className="title absolute top-1/2 text-6xl font-bold ml-5">
            <span className="text-primary">Mr.</span>
            <span className="">Phone</span>
            <span className="text-primary">X</span>
            </h1>
            <h3 className="subtitle absolute right-5 text-lg font-semibold text-stone-300">Buy your dream smartphone <br/> in cheap prices</h3>
        </div>

            <h2 className=" w-[380px] text-xl inline-block font-bold translate-x-[-55%] mt-5 border-b-4 border-solid border-primary ">List of all available devices for sale</h2>

        <CardList products={products} />
    </div>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts
})
const mapDispatchToProps = dispatch => ({
    fetchProducts: ()=> dispatch(fetchProductsStart())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage))