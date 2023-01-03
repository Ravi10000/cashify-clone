import "./card-list.styles.scss";

// hooks
import { useState } from "react";

// packages
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import { updateProducts } from "../../redux/shop/shop.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import {
  selectProducts,
  selectProductsCount,
} from "../../redux/shop/shop.selectors";

// components
import CardItem from "../card/card.component";

const CardList = ({ products, productsCount, flash, updateProducts }) => {
  const [skip, setSkip] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchMoreProducts() {
    try {
      setIsFetching(true);
      const response = await axios.get(`/api/products?skip=${skip}&limit=${10}`);
      setIsFetching(false);
      if (response.data.error) {
        setHasMore(false);
        return;
      }
      updateProducts([...products, ...response.data.products]);
      if (products?.length + response.data.products?.length === productsCount) {
        setHasMore(false);
        return;
      }
      setSkip((skip) => skip + 10);
    } catch (error) {
      console.log(error);
      flash({
        type: "error",
        message: "Something went wrong",
      });
    }
  }
  return (
    <div className="card-list">
      {products.length ? (
        products.map((product) => (
          <div className="card-item-container">
            <CardItem key={product._id} product={product} />
          </div>
        ))
      ) : (
        <div className="loader-card-list"></div>
      )}
      {isFetching ? (
        <div className="loader-card-list"></div>
      ) : hasMore && products.length ? (
        <p className="more center-text" onClick={fetchMoreProducts}>
          show more
        </p>
      ) : products.length && !isFetching ? (
        <p className="center-text">You've seen it all.</p>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  productsCount: selectProductsCount,
});

const mapDispatchToProps = (dispatch) => ({
  updateProducts: (products) => dispatch(updateProducts(products)),
  flash: (flash) => dispatch(setFlash(flash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
