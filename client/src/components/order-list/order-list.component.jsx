import './order-list.styles.scss'
import OrderItem from './order-item/order-item.component'

const OrderList = ({orders})=>{
    return(
        <div className="order-list">
            {
                orders.length
                ? orders.map(order=>
                   <OrderItem key={order._id} order={order}/>)
                    : <div>No Orders</div>
                }
        </div>
    )
}

export default OrderList;