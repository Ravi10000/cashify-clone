import './edit-profile.page.styles.scss'
import {useState} from 'react';
import axios from 'axios';
// components
import CustomButton from '../../components/custom-buttom/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { withRouter } from 'react-router-dom';
import { updateUserStart } from '../../redux/user/user.actions';

const EditProfilePage = ({currentUser, history, updateUserStart}) => {
    const [userInfo, setUserInfo] = useState({name: currentUser?.name, address: currentUser?.address, "phone number": currentUser?.mobile});
    
    const handleSubmit = async(event)=>{
        event.preventDefault()
        // const {name, address} = userInfo;
        updateUserStart(userInfo)
        history.push('/profile')
        // const resUser = await axios.put('/api/user', {...userInfo})
        // const resUserJson = resUser.json()

        // if(resUser.status === 200){
        //     history.push('/')
        // }
    }
    const handleChange = event =>{
        const {name, value} = event.target;
        setUserInfo({...userInfo, [name] : value})
        console.log(name, value)
    }
    return(
    <div className="edit-profile-page">
        <div className="container">
            <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='profile-info'>
                <CustomInput 
                name="name" 
                type="text" 
                value={userInfo.name} 
                msg='enter your full name' 
                handleChange={handleChange}/>

                <CustomInput 
                name='phone number'
                type='number'
                value={userInfo['phone number']}
                msg='enter your phone number'
                onChange={handleChange}
                />
                {/* <CustomInput name="address" msg="enter your address" value={currentUser?.address} type="text" /> */}
                <div className="address-container">
                    <label htmlFor="address">Address</label>
                <textarea 
                id='address'
                name='address'
                onChange={handleChange}
                >{userInfo?.address}</textarea>
                <p className='msg'>enter complete address with pincode</p>
                </div>
            <div className="save-button-container">
                <CustomButton>Save Profile</CustomButton>
            </div>
        </form>
        </div>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
    updateUserStart: userInfo => dispatch(updateUserStart(userInfo))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfilePage));