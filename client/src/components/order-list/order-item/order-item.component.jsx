import './order-item.styles.scss';
import { Link } from 'react-router-dom';

const OrderItem = ({order}) => {
    const {product} = order
    const title = product.brand + " " + product.model
    let statusColor = '#ffb703'
    if(order.status === 'delivered'){
        statusColor = '#25a180'
    }
    if(order.status === 'cancelled'){
        statusColor = '#e63946'
    }
    return (
        <div className="order-item">
            <div className="order-info">
                <div className="image-container">
                    <img src={product.images[0].url} alt={title}/>
                </div>
                <div className="info-container">
                    <h2 className='title'>{title} - refurbish({product.quality})</h2>
                    <p><div className="color" style={
                        {display: 'inline-block', 
                        height: '20px', 
                        width: '20px', 
                        background: product.color,
                        marginBottom: '-5px',
                        borderRadius: '2px',
                        }}></div> {product.color}</p>
                    
                    <p><span>{product.ram}Gb/{product.storage}Gb</span></p>
                    <p><span>Order Id: </span>{order._id}</p>
                    <p><span>Order Date: </span>{order.createdAt}</p>
                    <p><span>Product Id: </span>{product._id}</p>
                    <p><span>Order Status:</span> <span style={
                        {
                            color: statusColor
                        }
                    }
                    >{order.status}</span></p>
                    </div>
            </div>
                <div className="other-info">
                    <Link to={`/product/${product._id}`}>
                        <p>Go To Product Page</p>
                        </Link>
                        <a href="tel:+919667273499">
                    <p>Call for Support: <span>+919667273499</span></p>
                    </a>
                </div>
        </div>
    )
}

export default OrderItem;