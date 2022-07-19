// styles
import "./homepage.styles.scss";

//react hooks
import { useEffect, useState } from "react";

// packages
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import {
  initializeProducts,
  updateProducts,
} from "../../redux/shop/shop.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import {
  selectProducts,
  selectProductsCount,
} from "../../redux/shop/shop.selectors";

//components
import { HashLink } from "react-router-hash-link";
import CardList from "../../components/card-list/card-list.component";

const Homepage = ({
  products,
  productsCount,
  setFlash,
  initializeProducts,
  updateProducts,
}) => {
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/api/products?limit=${6}`);
        if (response.data.error) {
          console.log(response.data.error);
          setFlash({
            type: "error",
            message: response.data.error.message,
          });
          return;
        }
        //   setSkip(5)
        console.log(response.data);
        initializeProducts(response.data);
      } catch (error) {
        console.log(error);
        setFlash({
          type: "error",
          message: error.message,
        });
      }
    })();
    return () => {
      initializeProducts({ products: [], productsCount: 0 });
    };
  }, [setFlash, initializeProducts]);

  return (
    <div className="homepage">
      <div className="banner">
        <HashLink smooth={true} to="#for-sale">
          <h1 className="title">
            <span className="">Mr.</span>
            Phone
            <span className="">X</span>
          </h1>
          <div className="subtitle">
            <p>Buy your</p>
            <p className="subtitle-highlight">dream smartphones</p>
            <p>with our</p>
            <p className="subtitle-highlight">affordable prices</p>
          </div>
        </HashLink>
      </div>
      <div className="device-list">
        <h2 className="title" id="for-sale">
          For Sale
        </h2>
        <h2 className="subtitle">Refurbished Smartphones</h2>
        <div className="card-list-container">
          <CardList />
        </div>
        <div className="quality-description">
          <h3>Quality Descriptions</h3>
          <p>
            <span>Superb: </span>Almost new devices with warrenty of 6 months
            from our side.
          </p>
          <p>
            <span>Best: </span>Devices in great condition with warrenty of 3
            months from our side.
          </p>
          <p>
            <span>Good: </span>Devices in okay condition with warrenty of 1 and
            1/2 months from our side.
          </p>
          <p>
            <span>Not Bad: </span>Devices that have some issue with warrenty of
            1 month from our side.
          </p>
        </div>
      </div>
    </div>
  );
};

// connecting to store
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  productsCount: selectProductsCount,
});

const mapDispatchToProps = (dispatch) => ({
  updateProducts: (products) => dispatch(updateProducts(products)),
  initializeProducts: (productsInfo) =>
    dispatch(initializeProducts(productsInfo)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
