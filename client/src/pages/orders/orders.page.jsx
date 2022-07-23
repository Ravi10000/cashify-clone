import "./orders.styles.scss";

// components
import OrderList from "../../components/order-list/order-list.component";
import ScrollToTop from "../../components/scroll-to-top/scroll-to-top.component";


const OrdersPage = ({ user }) => {

  return (
    <div className="orders-page">
      <ScrollToTop />
      <div className="container">
        <h1>My Orders</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default OrdersPage;