import './profile.styles.scss';
// components
import CustomButton from '../../components/custom-buttom/custom-button.component'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link } from 'react-router-dom';

import { signOutUserStart } from '../../redux/user/user.actions';

const ProfilePage = ({currentUser, signOut}) => {
    console.log(currentUser)
    return (
    <div className="profile-page">
        <div className="container">
        <h1>Profile</h1>
        <div className="profile-info">
            <p>Name🙋‍♂️</p>
            <p>{currentUser?.name || 'not set'}</p>
            <p>Email📧</p>
            <p>{currentUser?.email}</p>
            <p>Phone Number📱</p>
            <p>{currentUser?.mobile}</p>
            <p>Address🏠</p>
            <p>{currentUser?.address || 'not set'}</p>
            <p>Your Orders🧡</p> 
        </div>
        <div className="buttons-container">
        <div className="edit-container">
            <Link to='/edit-profile'>
            <CustomButton secondary><img src="./icons/edit.png" alt="edit"/> Edit Profile</CustomButton>
            </Link>
        </div>
        <div className="signout-container">
                <CustomButton  onClick={signOut}secondary>Sign Out</CustomButton>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);