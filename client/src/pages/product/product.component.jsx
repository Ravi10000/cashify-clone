import "./product.styles.scss";

// hooks
import { useEffect, useState } from "react";

// packages
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import CustomButton from "../../components/custom-button/custom-button.component";
import ImagesCarousel from "../../components/carousel/carousel.component";
import Loader from "../../components/loader/loader.component";
import Table from "../../components/Table/table.component";
import ScrollToTop from "../../components/scroll-to-top/scroll-to-top.component";

// actions
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectProducts } from "../../redux/shop/shop.selectors";

const Productpage = ({ match, history, currentUser, flash }) => {
  const { id } = match.params;

  // states and setState
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // checking is product is available
  let isOutOfStock = false;
  if (product?.units === 0) isOutOfStock = true;

  // keys for product description table
  const keys = [
    "Brand",
    "Model",
    "Color",
    "RAM",
    "Storage",
    "Price",
    "Operating System",
    "Battery Capacity",
    "Front Camera",
    "Rear Camera",
    "Chipset",
    "CPU Info",
    "GPU Info",
  ];

  // values for table description table
  const values = [
    product?.brand,
    product?.model,
    product?.color,
    `${product?.ram} gb`,
    `${product?.storage} gb`,
    `rs ${product?.price}`,
    product?.os,
    `${product?.["battery capacity"]} mAh`,
    `${product?.["front camera"]} megapixels`,
    `${product?.["back camera"]} megapixels`,
    product?.chipset,
    product?.cpu,
    product?.gpu,
  ];

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setIsFetching(false);

        if (data.error) {
          console.log(data.error);
          flash({
            type: "error",
            message: data.error.message,
          });
          return;
        }

        setProduct(data.product);
      } catch (error) {
        console.log(error);
        flash({
          type: "error",
          message: error.message,
        });
      }
    })();
  }, [setProduct, id, flash]);

  const goToCheckout = () => {
    setIsLoading(true);
    if (!currentUser) {
      flash({
        type: "info",
        message: "You must be signned in! to place any order.",
      });
      history.push("/signin");
      return;
    }
    const { name, address } = currentUser;
    if (!name || !address) {
      flash({
        type: "info",
        message:
          "INCOMPLETE PROFILE! | your name and address is required to checkout.",
      });
      history.push("/edit-profile");
      return;
    }
    history.push(`/checkout/${product?._id}`);
  };

  return (
    <div className="product-page">
      <ScrollToTop />
      {isFetching ? (
        <div className="product-loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="image-container">
              {product?.images?.length > 1 ? (
                <ImagesCarousel images={product?.images} />
              ) : (
                <img src={product?.images[0]?.url} alt="product" />
              )}
            </div>
            <div className="info-container">
              <h3 className="name">
                {product?.brand} {product?.model}{" "}
                <span>- refurbish {product?.quality}</span>
              </h3>
              <p className="ram-storage">
                {product?.ram}Gb/{product?.storage}Gb
              </p>
              <p>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: product?.color,
                    width: "20px",
                    height: "20px",
                    borderRadius: "2px",
                    marginBottom: "-5px",
                  }}
                ></span>{" "}
                {product?.color}{" "}
              </p>
              <p>{product?.quality} Quality</p>
              <p className="price">₹ {product?.price} only</p>
              <p className="units-left">
                {isOutOfStock ? (
                  <span style={{ color: "var(--danger)" }}>Out of stock</span>
                ) : product?.units === 1 ? (
                  <span>last {product?.units} unit left at this price</span>
                ) : (
                  <span>{product?.units} units left at this price</span>
                )}
              </p>
              {!isOutOfStock && (
                <div className="button-container">
                  <CustomButton
                    onClick={goToCheckout}
                    isLoading={isLoading && true}
                  >
                    Buy Now
                  </CustomButton>
                </div>
              )}
            </div>
          </div>
          {product?.message && (
            <div className="message">
              <h3>Important Message: </h3>
              <p>{product?.message}</p>
            </div>
          )}
          <div className="delivery-options">
            <div className="cod">
              <img src="/icons/cod.png" alt="cod" />
              <p>cash on delivery</p>
            </div>
            <div className="exchange">
              <img src="/icons/exchange.png" alt="exchange" />
              <p>30 day replacement</p>
            </div>
          </div>
          <div className="description">
            <Table title="Description" keys={keys} values={values} />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  currentUser: selectCurrentUser,
});

const mapActionstoProps = (dispatch) => ({
  flash: (flash) => dispatch(setFlash(flash)),
});
export default connect(
  mapStateToProps,
  mapActionstoProps
)(withRouter(Productpage));
