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
                const {brand, model, price, images, quality, ram, storage, units} = product;
                console.log(brand, model, price, images)
                return <CardItem 
               key = {product._id} 
               id= {product._id}
               title = {`${brand} ${model}`}
               price = {price}
               imageUrl = {images[0].url}
               quality = {quality}
               ram={ram}
               storage={storage}
               units={units}
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