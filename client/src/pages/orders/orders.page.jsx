import './orders.styles.scss'
import {useState, useEffect} from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'


import OrderList from '../../components/order-list/order-list.component'

const OrdersPage = ({user})=>{
    const [orders, setOrders] = useState([])
    
    useEffect(()=>{
        (async ()=>{
            const res = await axios.post(`/api/orders/my-orders`, {orderIds: user.orders})
            setOrders(res.data)
        })()
    },[user])

    return(
        <div className='orders-page'>
            <div className="container">
                <h1>My Orders</h1>
                {
                    orders.length 
                    && <OrderList orders={orders.reverse()}/>
                }
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    user : selectCurrentUser
})
export default connect(mapStateToProps)(OrdersPage)