import { CardListContainer } from "./card-list.styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProducts } from "../../redux/shop/shop.selectors";
import CardItem from "../card/card.component";

const CardList = ({products})=>{
    return(
    <CardListContainer>
        {
            products?.map(product => 
              { 
                const {brand, model, price, imageUrl} = product;
                return <CardItem 
               key = {product._id} 
               title = {`${brand} ${model}`}
               price = {price}
               imageUrl = {imageUrl}
               />
            })
        }
    </CardListContainer>
)
}
const mapStateToProps = createStructuredSelector({
    products: selectProducts,
})

export default connect(mapStateToProps)(CardList)