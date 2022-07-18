// styles
import "./homepage.styles.scss";

//react hooks
import { useEffect } from "react";

// packages
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import { setProducts } from "../../redux/shop/shop.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import { selectProducts } from "../../redux/shop/shop.selectors";
import { selectFlash } from "../../redux/flash/flash.selectors";
//components
import CardList from "../../components/card-list/card-list.component";

const Homepage = ({ setFlash, flash, products, setProducts }) => {
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/products");
        if(res.data.error){
          setFlash({
            type: "error",
            message: "Something went wrong while fetching products",
          });
          return
        }
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
        setFlash({
          type: "error",
          message: "Something went wrong while fetching products",
        });
      }
    })();
  }, [setProducts, setFlash]);

  return (
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
          <br />
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
  flash: selectFlash,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (products) => dispatch(setProducts(products)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
