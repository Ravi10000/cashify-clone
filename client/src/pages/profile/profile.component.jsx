import './profile.styles.scss';
// components
import CustomButton from '../../components/custom-button/custom-button.component'
import { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link, withRouter } from 'react-router-dom';

import ScrollToTop from "../../components/scroll-to-top/scroll-to-top.component";

import { signOut } from '../../redux/user/user.actions';
import { setFlash } from '../../redux/flash/flash.actions';

const ProfilePage = ({flash, currentUser, signOut, history}) => {
    const [isLoading, setIsLoading] = useState(false); 
    const signOutAndSetLoading = async() => {
        try{
            setIsLoading(true)
        const {data} =await axios.post('https://mrphonex-api.onrender.com/api/user/signout');
        setIsLoading(false)
        if(data.error){
            console.error(data.error)
            flash({
                type: 'error',
                message: 'something went wrong please try again'
            })
            return
        }
        signOut()
        flash({
            type: 'success',
            message: 'signed out successfully'
        })
        history.push('/')
        }
        catch(error){
            console.error(error)
            setIsLoading(false)
            flash({
                type: 'error',
                message: 'something went wrong please try again'
            })
            history.push('/profile')
            }
        }  
    return (
    <div className="profile-page">
        <ScrollToTop />
        <div className="container">
            <div className="profile-image-container">
                <img src="/icons/custom-user.png" alt="" />
            </div>
                <p className='name'>{currentUser?.name || '--not set--'}</p>
            <p>{currentUser?.username}</p>
                        <p>{currentUser?.["phone number"]}</p>
        <div className="address-container">
            <p className='address-title'>Address</p>
            <p>{currentUser?.address || '--not set--'}</p>
        </div>
        
        {currentUser && <>
            <Link to='/orders'>
        <div className="orders-link">
                <img src="/icons/order.png" alt="" /> 
                <p>My Orders</p>
        </div>
            </Link>

        <div className="buttons-container">
            <div className="edit-container">
            <Link to='/edit-profile'>
            <CustomButton secondary>Edit Profile</CustomButton>
            </Link>
            </div>

            <div className="signout-container">
                    <CustomButton  onClick={signOutAndSetLoading} isLoading={isLoading}>Sign Out</CustomButton>
            </div>
        </div>
        </>}
        </div>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    signOut: ()=> dispatch(signOut()),
    flash: (flash)=> dispatch(setFlash(flash))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));