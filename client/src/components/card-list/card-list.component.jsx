// styles
import "./card-list.styles.scss";

// packages
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// selectors
import { selectProducts } from "../../redux/shop/shop.selectors";

// components
import CardItem from "../card/card.component";

const CardList = ({ products }) => {
  return (
    <div className="card-list">
      {products?.map((product) => (
        <CardItem key={product._id} product={product} />
      ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});

export default connect(mapStateToProps)(CardList);
