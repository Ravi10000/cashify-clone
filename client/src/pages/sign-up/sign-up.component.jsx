import './sign-up.styles.scss';
import axios from 'axios';
import {useForm} from 'react-hook-form';
// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUserStart} from '../../redux/user/user.actions'

const SignUp = ({history, fetchUser})=>{
    const bgColor = 'rgba(209, 230, 224, 0.7)';
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    console.log(errors)
    const submitForm = async data =>{
        const {email, password} = data
        console.log(email, password, data["phone number"])
        const res = await axios.post('/api/user/signup', {email, password, mobile: data["phone number"]})
        // const {user} = res.data
        // updateUser(user)
        fetchUser()
        history.push({
            pathname: '/profile',
            state: {
                type: 'success',
                message: 'Sign up successful'
            }
        })
    }
    const password = watch('password');

    return(
<div className="signup-page">
    <h3>Already have an account? <Link to='/signin'><span>Sign-in</span></Link></h3>
<div className="container">
    {/* method='POST' action='/api/user/signup' */}
<form noValidate onSubmit={handleSubmit(submitForm)}>
    <h1 className="form-title">Sign Up</h1>
        <div className="inputs-container">
            <div className="email-container">
            <CustomInput 
            register = {{...register('email', {
                required: "email is required!", 
                pattern: {
                value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email" 
            }})}}
            bgColor={bgColor}
            name='email' type='text' 
            msg='e.g. handle@gmail.com 📧' 
            required
            />
            <p className='errors'>{errors?.email?.message}</p>
            </div>
            <div className="phone-container">
           <CustomInput 
            register = {{...register('phone number', {required: "phone number is required!", minLength: {
                value: 10,
                message: "phone number must be 10 digits"
            },
            maxLength: {
                value: 10,
                message: "phone number must be 10 digits"
            }
        })}}
            bgColor={bgColor}
            name='phone number' type='number' 
            msg='10 digit 📱mobile number' 
            required
            />
            <p className='errors'>{errors?.["phone number"]?.message}</p>
            </div>
            <div className="password-container">
            <CustomInput 
            register = {{...register('password', {
                required: "password is required!",
                minLength: {
                    value: 8,
                    message: "password must be at least 8 characters"
            },
            maxLength: {
                value: 16,
                message: "password must be at most 16 characters"
            }
            })}}
            bgColor={bgColor}
            name='password' type='password' 
            msg='password should be 8-16 characters 🔒'
            required
            />
            <p className='errors'>{errors?.password?.message}</p>
            </div>
            <div className="confirm-password-container">
            <CustomInput 
            register={{...register('confirm password', {
                required: "confirm password is required!",
                minLength: {
                    value: 8,
                    message: "password must be at least 8 characters"
                },
                maxLength: {
                    value: 16,
                    message: "password must be at most 16 characters"
                },
                pattern: {
                value: RegExp(password),
                message: "password does not match"
            }})}}
            bgColor={bgColor}
            name='confirm password' type='password' 
            msg='should be same as password🔒' 
            required
            />
            <p className='errors'>{errors?.["confirm password"]?.message}</p>
            </div>
        </div>
        <div className="signup-button-container">
        <CustomButton myStyles={{color: '#97DAC8', backgroundColor: '#194656'}}>Sign Up</CustomButton>
        </div>
    </form>
</div>
</div>
)}


const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUserStart())
})

export default connect(null, mapDispatchToProps)(withRouter(SignUp))