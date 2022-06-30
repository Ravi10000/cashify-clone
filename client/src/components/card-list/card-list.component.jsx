import './card-list.styles.scss';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProducts } from "../../redux/shop/shop.selectors";
import CardItem from "../card/card.component";

const CardList = ({products})=>{
    return(
    <div className="card-list">
        {
            products?.map(product => 
              { 
                const {brand, model, price, imageUrls, quality, ram, storage} = product;
                console.log(brand, model, price, imageUrls)
                return <CardItem 
               key = {product._id} 
               id= {product._id}
               title = {`${brand} ${model}`}
               price = {price}
               imageUrl = {imageUrls[0]}
               quality = {quality}
               ram={ram}
               storage={storage}
               />
            })
        }
    </div>
)
}
const mapStateToProps = createStructuredSelector({
    products: selectProducts,
})

export default connect(mapStateToProps)(CardList)