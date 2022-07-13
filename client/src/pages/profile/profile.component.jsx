import './profile.styles.scss';
// components
import CustomButton from '../../components/custom-buttom/custom-button.component'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link, withRouter } from 'react-router-dom';

import { signOutUserStart } from '../../redux/user/user.actions';

const ProfilePage = ({currentUser, signOut, history, location}) => {
    console.log('history', history)
    console.log('location', location)
    return (
    <div className="profile-page">
        <div className="container">
            <div className="profile-image-container">
                <img src="./icons/custom-user.png" alt="" />
            </div>
                <p className='name'>{currentUser?.name || '--not set--'}</p>
            <p>{currentUser?.email}</p>
                        <p>{currentUser?.mobile}</p>
        <div className="address-container">
            <p className='address-title'>Address</p>
            <p>{currentUser?.address || '--not set--'}</p>
        </div>
            <Link to='/orders'>
        <div className="orders-link">
                <img src="./icons/order.png" alt="" /> 
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
                    <CustomButton  onClick={signOut}>Sign Out</CustomButton>
            </div>

        </div>

        </div>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    signOut: ()=> dispatch(signOutUserStart())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));