import { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./checkout.styles.scss";
import Card from "../../components/card/card.component";
import CustomButton from "../../components/custom-buttom/custom-button.component";

import { connect } from "react-redux";
// import {createStructuredSelector} from 'reselect';
import { updateUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

const CheckoutPage = ({ flash, history, match, updateUser }) => {
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    (async function () {
      const { productid } = match.params;
      const { data } = await axios.get(`/api/products/${productid}`);
      setCheckoutItem(data);
    })();
  }, [match.params, setCheckoutItem]);

  const handleSubmit = async (e) => {
    try {
        setIsLoading(true)
      e.preventDefault();
      const res = await axios.post(`/api/orders/new`, { id: checkoutItem._id });
      updateUser(res.data.user);
      flash({
        type: "success",
        message:
          "Order placed successfully our executive will contact you shortly. Thanks for choosing our service.",
      });
      history.push("/orders");
    } catch (error) {
        setIsLoading(false)
      console.log(error.message);
      flash({
        type: "error",
        message: error.message,
      });
    }
  };
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        {checkoutItem && (
          <div className="card-container">
            <Card product={checkoutItem} />
            {/* title, price, imageUrls, quality, ram, storage, history */}
          </div>
        )}

        <p className="total">
          Total: <span>₹ {checkoutItem?.price}</span>
        </p>
        <div className="button-container">
          <CustomButton onClick={handleSubmit} isLoading={isLoading}>Place Order</CustomButton>
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
