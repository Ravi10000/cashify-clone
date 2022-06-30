import { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './checkout.styles.scss';
import Card from '../../components/card/card.component';
import CustomButton from '../../components/custom-buttom/custom-button.component';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {updateUserStart} from '../../redux/user/user.actions';

const CheckoutPage = ({history, match, updateUserStart}) => {
    console.log(history, match, match.params)
    const [checkoutItem, setCheckoutItem] = useState(null);
    useEffect(() => {
        (async function(){
            const {productid} = match.params;

        const {data} = await axios.get(`/api/products/${productid}`);
        setCheckoutItem(data)
        })()
    }, [match.params, setCheckoutItem])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {productid} = match.params;
       axios.put(`/api/user/generate-order`, {productid})
       console.log('done');
       history.push('/profile')
    }
    return(
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>
            {
                checkoutItem &&
                <div className="card-container">
                    <Card 
                    id={checkoutItem._id}
                    title={checkoutItem.brand + " " + checkoutItem.model}
                    price={checkoutItem.price}
                    imageUrl={checkoutItem.imageUrls[0]}
                    quality={checkoutItem.quality}
                    ram={checkoutItem.ram}
                    storage={checkoutItem.storage}
                    />
                    {/* title, price, imageUrls, quality, ram, storage, history */}
                </div>
            }

            <p className='total'>Total: <span>₹ {checkoutItem?.price}</span></p>
            <div className="button-container">
                <CustomButton onClick={handleSubmit}>Place Order</CustomButton>
            </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    updateUserStart: (user) => dispatch(updateUserStart(user))
})

export default connect(null, mapDispatchToProps)(withRouter(CheckoutPage))