import "./order-list.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import { setFlash } from "../../redux/flash/flash.actions";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";

// components
import OrderItem from "./order-item/order-item.component";
import Loader from "../../components/loader/loader.component";

const OrderList = ({ flash, user }) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(`/api/orders/my-orders`, {
          orderIds: user?.orders,
        });
        setIsFetching(false);
        if(res?.data?.error){
            flash({
                type: 'error',
                message: res?.data?.error?.message
            })
            return
        }
        console.log(res?.data?.orders);
        setOrders(res?.data?.orders);
      } catch (error) {
        console.error({error});
        flash({
            type: 'error',
            message: 'Something went wrong. Please try again.'
        })
      }
    })();
  }, [user, flash]);

  const loaderStyles = isFetching
    ? { display: "flex", justifyContent: "center", alignItems: "center" }
    : {};

  return (
    <div className="order-list" style={loaderStyles}>
      {isFetching ? (
        <Loader />
      ) : (
        orders?.map((order) => <OrderItem key={order._id} order={order} />)
      )
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    flash: (flash) => dispatch(setFlash(flash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
