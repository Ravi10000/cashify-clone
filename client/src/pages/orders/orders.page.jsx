import "./orders.styles.scss";

// components
import OrderList from "../../components/order-list/order-list.component";

const OrdersPage = ({ user }) => {

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default OrdersPage;