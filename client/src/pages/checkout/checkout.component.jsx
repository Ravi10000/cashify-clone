import "./checkout.styles.scss";

// hooks
import { useState, useEffect } from "react";

// packages
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// components
import Card from "../../components/card/card.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ScrollToTop from "../../components/scroll-to-top/scroll-to-top.component";


// redux actions
import { updateUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

const CheckoutPage = ({ flash, history, match, updateUser }) => {
  const [checkoutItem, setCheckoutItem] = useState(null);

  // to show loading animation while sending chekcout request
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const { productid } = match.params;
        const { data } = await axios.get(`https://mrphonex-api.onrender.com/api/products/${productid}`);
        if (data.error) {
          console.log(data.error)
          flash({
            type: "error",
            message: data.error.message,
          });
          return;
        }
        setCheckoutItem(data.product);
      } catch (error) {
        console.log(error);
        flash({
          type: "error",
          message: error.message,
        });
      }
    })();
  }, [match.params, setCheckoutItem, flash]);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const {data} = await axios.post(`https://mrphonex-api.onrender.com/api/orders/new`, { id: checkoutItem._id });
      if (data.error) {
        console.log(data.error)
        flash({
          type: "error",
          message: data.error.message,
        });
        return;
      }
      updateUser(data.user);
      flash({
        type: "success",
        message:
          "Order request received our executive will contact you shortly. Thanks for choosing our service.",
      });
      history.push("/orders");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      flash({
        type: "error",
        message: error.message,
      });
    }
  };
  return (
    <div className="checkout-page">
      <ScrollToTop />
      <div className="container">
        <h1>Checkout</h1>
        {checkoutItem && (
          <div className="card-container">
            <Card product={checkoutItem} />
          </div>
        )}

        <p className="total">
          Total: <span>₹ {checkoutItem?.price}</span>
        </p>
        <div className="button-container">
          <CustomButton onClick={handleSubmit} isLoading={isLoading}>
            Place Order
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user)),
  //   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  flash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(withRouter(CheckoutPage));
