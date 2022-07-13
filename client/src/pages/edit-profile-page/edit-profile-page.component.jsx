import './edit-profile.page.styles.scss'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form'
// components
import CustomButton from '../../components/custom-buttom/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { withRouter } from 'react-router-dom';
import { updateUserStart } from '../../redux/user/user.actions';

const EditProfilePage = ({currentUser, history, updateUser}) => {
    const {name, address} = currentUser;
    const [userInfo, setUserInfo] = useState({name, address, "phone number": currentUser.mobile});
    // useEffect(() => {
    //     // setUserInfo({...currentUser, "phone number": currentUser.mobile})
    //     console.log(userInfo)
    // }, [setUserInfo, currentUser]);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: userInfo});
    
    const submitForm = async data => {
        console.log(data)
        const {name, address, "phone number": mobile} = data;
        // const res = await axios.put('/api/user', {name, address, mobile});
        updateUser({name, address, mobile});
        history.push('/profile');
    }
    return(
    <div className="edit-profile-page">
        <div className="container">
            <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit(submitForm)} className='profile-info'>
                <CustomInput 
                name="name" 
                type="text" 
                msg='enter your full name' 
                register = {{...register('name')}}
                />

                <CustomInput 
                name='phone number'
                type='number'
                // value={userInfo['phone number']}
                msg='enter your phone number'
                register = {{...register('phone number', {
                    required: "phone number is required",
                    minLength: {
                        value: 10,
                        message: "phone number must be 10 digits"
                    },
                    maxLength: {
                        value: 10,
                        message: "phone number must be 10 digits"
                    }
                })}}
                />
                <p className='errors'>{errors?.["phone number"]?.message}</p>
                {/* <CustomInput name="address" msg="enter your address" value={currentUser?.address} type="text" /> */}
                <div className="address-container">
                    <label htmlFor="address">Address</label>
                <textarea 
                id='address'
                name='address'
                {...register('address')}
                // defaultValue={userInfo?.address}
                />
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
    updateUser: (user) => dispatch(updateUserStart(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfilePage));