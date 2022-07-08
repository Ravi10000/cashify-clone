import './sign-up.styles.scss';
import { useState } from 'react';
import axios from 'axios';
// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
import { Link, withRouter } from 'react-router-dom';

const SignUp = ({history, location, match})=>{
    // console.log('route', route)
    console.log('location', location);
    history.location.state = {success:{
        message: 'You have successfully signed up'
    }}
    console.log('match', match);
    console.log('history', history);
    const [formData, setFormData] = useState({
        email: '', 
        "phone number": '', 
        password: '', 
        "confirm password": ''})
    const {
        email, 
        password, 
        'phone number': phoneNumber, 
        'confirm password': confirmPassword
    } = formData;
    // const [emailWarning, setEmailWarning] = useState('')
    // const [phoneWarning, setPhoneWarning] = useState('')
    // const [passwordWarning, setPasswordWarning] = useState('')
    // const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('')

    // const handleChange = e => {
    //     const {name, value} = e.target;
    //     setFormData({...formData, [name]: value})
    //     switch (name) {
    //         case 'email':
    //             if(!email.includes('@') || !email.includes('.')){
    //                 setEmailWarning('email must be valid')
    //             }else{
    //                 setEmailWarning('')
    //             }
    //             break;
    //         case 'phone number':
    //             if(phoneNumber.toString().length === 9){
    //                 setPhoneWarning('')
    //             }else{
    //                 setPhoneWarning('phone number must be of 10 digits')
    //             }
    //             break
    //         case 'password':
    //             if(password.length < 7 || password.length > 15){
    //                 setPasswordWarning('password must be between 8 and 16 characters')
    //             }else{
    //                 setPasswordWarning('')
    //             }
    //             break
    //          case 'confirm password':
    //             if(password !== confirmPassword){
    //                 setConfirmPasswordWarning('password and confirm password must match')
    //             }else{
    //                 setConfirmPasswordWarning('')
    //             }
    //             break
    //         default:
    //             break;
    //     }
    // }

    // const validateForm = e =>{
    //     console.log('validate')
    //     e.preventDefault();
    //     let isValidForm = true
    //     const {email, "phone number": phoneNumber, password, "confirm password": confirmPassword} = formData;
    //     if(!email.includes('@') || !email.includes('.')){
    //         console.log('invalid email')
    //         isValidForm = false
    //         setEmailWarning('email must be valid')
    //     }
    //     if(isValidForm){
    //         console.log('form is valid', formData)
    //     }else{
    //         console.log('form is invalid', emailWarning)
    //     }
    // }
// const validateInput = e => {
//     const {name} = e.target;
//     console.log(name)
//     switch (name) {
//     case 'email':
//         if(!email.includes('@') || !email.includes('.')){
//             setEmailWarning('email must be valid')
//         }else{
//             setEmailWarning('')
//         }
//         break;
//     case 'phone number':
//         if(phoneNumber.toString().length === 9){
//             setPhoneWarning('')
//         }else{
//             setPhoneWarning('phone number must be of 10 digits')
//         }
//         break
//     case 'password':
//         if(password.length < 7 || password.length > 15){
//             setPasswordWarning('password must be between 8 and 16 characters')
//         }else{
//             setPasswordWarning('')
//         }
//         break
//      case 'confirm password':
//         if(password !== confirmPassword){
//             setConfirmPasswordWarning('password and confirm password must match')
//         }else{
//             setConfirmPasswordWarning('')
//         }
//         break
//     default:
//         break;
// }
// }
    // const submitForm = () => {
    //     axios.post('/api/user/signup', formData)       
    // }
    const bgColor = 'rgba(209, 230, 224, 0.7)';
    return(
<div className="signup-page">
    <h3>Already have an account? <Link to='/signin'><span>Sign-in</span></Link></h3>
<div className="container">
    {/* <div className="email-warning">
        {emailWarning}<br/>
        {phoneWarning}<br/>
        {passwordWarning}<br/>
        {confirmPasswordWarning}
    </div> */}
{/* method='POST' action='/api/user/signup' */}
{/* onSubmit={validateForm} */}
<form method='POST' action='/api/user/signup'>
    <h1 className="form-title">Sign Up</h1>
        <div className="inputs-container">
            <div className="email-container">
            <CustomInput 
            bgColor={bgColor}
            name='email' type='text' 
            msg='e.g. handle@gmail.com 📧' 
            // value={email} 
            // handleChange={handleChange}
            // validateInput={validateInput}
            required
            />
            </div>
            <div className="phone-container">
            <CustomInput 
            bgColor={bgColor}
            name='phone number' type='number' 
            msg='10 digit 📱mobile number' 
            // value={phoneNumber}
            // handleChange={handleChange}
            // validateInput={validateInput}
            required
            />
            </div>
            <div className="password-container">
            <CustomInput 
            bgColor={bgColor}
            name='password' type='password' 
            msg='password should be 8-16 characters 🔒'
            // value={password} 
            // handleChange={handleChange}
            // validateInput={validateInput}
            required
            />
            </div>
            <div className="confirm-password-container">
            <CustomInput 
            bgColor={bgColor}
            name='confirm password' type='password' 
            msg='should be same as password🔒' 
            // value={confirmPassword} 
            // handleChange={handleChange}
            // validateInput={validateInput}
            required
            />
            </div>
        </div>
        <div className="signup-button-container">
        <CustomButton myStyles={{color: '#97DAC8', backgroundColor: '#194656'}}>Sign Up</CustomButton>
        </div>
    </form>
</div>
</div>
)}

export default withRouter(SignUp)