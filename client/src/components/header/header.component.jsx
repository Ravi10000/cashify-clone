// styles import
import './header.styles.scss'
// react imports
// import {useState, useEffect} from 'react'

// components import
import CustomButton from "../../components/custom-buttom/custom-button.component"

// router imports
import { Link } from "react-router-dom"

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { signOutUserStart } from '../../redux/user/user.actions'
const Header = ({currentUser, signOut})=>{
    return(
    <div className="header">
        <div className="logo">
            <Link to='/'>
                <span className='highlight'>Mr.</span>
                <span>Phone</span>
                <span className='highlight'>X</span>
            </Link>
            <div className='underline'></div>
        </div> 
        <div className="buttons">
        {
            currentUser 
            ? 
            <div className="logged-in">
                <div className="signout-container">
                <CustomButton onClick={signOut} >Sign Out</CustomButton>
                </div>
                <Link className="profile-pic-container" to='/profile'>
                <img src="/icons/user-1.png" alt="" />
                </Link>
            </div>
            :
            <div className="signin-signup">
        <Link to='/signin'>
            <CustomButton>Sign In</CustomButton>
        </Link>
        <Link to='signup'>
            <CustomButton secondary>Sign Up</CustomButton>
        </Link>
        </div>
        }
        </div>
    </div>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    signOut: ()=> dispatch(signOutUserStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)