// styles
import "./card-list.styles.scss";

// hooks
import { useState } from "react";

// packages
import axios from 'axios'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import { updateProducts } from "../../redux/shop/shop.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import { selectProducts, selectProductsCount } from "../../redux/shop/shop.selectors";

// components
import InfiniteScroll from "react-infinite-scroll-component";
import CardItem from "../card/card.component";

const CardList = ({ products, productsCount, flash, updateProducts }) => {
  const [skip, setSkip] = useState(6);
  const [hasMore, setHasMore] = useState(true);


  async function fetchMoreProducts(){
    try{ 
        if(products.length === productsCount) {
            setHasMore(false)
            return
        }
        const response = await axios.get(`/api/products?skip=${skip}&limit=${6}`);
        if(response.data.error){
            setHasMore(false);
            return
        }
            updateProducts([...products, ...response.data.products]);
        setSkip(skip=>skip+6);
    }catch(error){
        console.log(error)
        flash({
            type: 'error',
            message: 'Something went wrong'
        })
    }
  }
  console.log(products);
  return (
    <>
    {products.length && (
        <InfiniteScroll 
        className="card-list"
        dataLength={products.length}
        hasMore={hasMore}
        next={fetchMoreProducts}
        endMessage="all done."
        loader={<div className="loader-card-list"></div>}
        >
          {products.map((product) => (
            <CardItem key={product._id} product={product} />
          ))}
        </InfiniteScroll>
      )}
    </>
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
