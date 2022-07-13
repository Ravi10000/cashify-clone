import './sign-in.styles.scss'
import {useState} from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom'
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
import { fetchUserStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
const SignIn = ({history, fetchUser})=>{
    const {register, handleSubmit, formState: {errors}} = useForm();

        const submitForm = async data => {
            const {email: username, password} = data
            console.log(username, password)
            const res = await axios.post('/api/user/signin', {username, password})
            // const {redirectUrl} = res.data
            fetchUser()
            history.push({
                pathname: '/',
                state: {
                    type: 'success',
                    msg: 'signed in successfully',
                }
            })
        }
        console.log(errors)
    return(
<div className="signin-page">
<h3>Don't have an account? <Link to='/signup'><span>Sign-up</span></Link></h3>
<div className="container">
<form noValidate onSubmit={handleSubmit(submitForm)}>
    {/* <div className="user-img">
    <img src="./icons/user-2.png" alt="" className=""/>
    </div> */}
    <h1 className="form-title">Sign In</h1>
        <div className="inputs-container">
            <div className="username-input-container">
            <CustomInput 
            name='email' 
            type='text' 
            msg='e.g. mail@gmail.com 📧' 
            register = {{...register('email', {
                required: "email is required!", 
                pattern: {
                value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email" 
            }})}}
            required
            />
            <p className='errors'>{errors?.email?.message}</p>
            </div>
            <div className="password-input-container">
            <CustomInput 
            register = {{...register('password', {
                required: "password is required!", 
                minLength: {value: 8, message: 'min length 8'}, 
                maxLength: {value: 16, message: 'max length 16'},
            })}}
            name='password' 
            type='password' 
            msg='enter your 🔒secure password here' 
            required
            />
            <p className='errors'>{errors?.password?.message}</p>
            </div>
        </div>
        <div className="signin-button-container">
        <CustomButton>Sign In</CustomButton>
        </div>
    </form>
</div>
</div>
)}

const mapDispatchToProps = dispatch => ({
    fetchUser: ()=> dispatch(fetchUserStart())
})
export default connect(null, mapDispatchToProps)(withRouter(SignIn))