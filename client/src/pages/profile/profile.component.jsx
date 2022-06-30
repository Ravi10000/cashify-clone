import './profile.styles.scss';
// components
import CustomButton from '../../components/custom-buttom/custom-button.component'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link } from 'react-router-dom';

const ProfilePage = ({currentUser}) => {
    console.log(currentUser)
    return (
    <div className="profile-page">
        <div className="container">
        <h1>Profile</h1>
        <div className="profile-info">
            <p>Name</p>
            <p>{currentUser?.name || 'not set'}</p>
            <p>Email</p>
            <p>{currentUser?.email}</p>
            <p>Phone Number</p>
            <p>{currentUser?.mobile}</p>
            <p>Address</p>
            <p>{currentUser?.address || 'not set'}</p>
            <p>Your Orders</p> 
        </div>
        <div className="edit-button-container">
            <Link to='/edit-profile'>
            <CustomButton secondary>Edit Profile</CustomButton>
            </Link>
        </div>
        </div>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(ProfilePage);