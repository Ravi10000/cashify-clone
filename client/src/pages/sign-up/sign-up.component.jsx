import './sign-up.styles.scss';
import { useState } from 'react';
// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
import { Link } from 'react-router-dom';

const SignUp = ()=>{
    const [formData, setFormData] = useState({
        email: '', 
        "phone number": '', 
        password: '', 
        "confirm password": ''})
    const [warning, setWarning] = useState(null)

    const handleChange = e => {
        const {name, value} = e.target;
        if(name === 'email'){
            if(value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                console.log(true);
            }
        }
        setFormData({...formData, [name]: value})
    }
    const bgColor = 'rgba(209, 230, 224, 0.7)';
    return(
<div className="signup-page">
    <h3>Already have an account? <Link to='/signin'><span>Sign-in</span></Link></h3>
<div className="container">
<form method='POST' action='/api/user/signup'>
    <h1 className="form-title">Sign Up Form</h1>
        <div className="inputs-container">
            <div className="email-container">
            <CustomInput 
            bgColor={bgColor}
            name='email' type='text' 
            msg='e.g. handle@gmail.com 📧' 
            value={formData.email} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="phone-container">
            <CustomInput 
            bgColor={bgColor}
            name='phone number' type='number' 
            msg='10 digit 📱mobile number' 
            value={formData['phone number']} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="password-container">
            <CustomInput 
            bgColor={bgColor}
            name='password' type='password' 
            msg='choose something 💪strong'
            value={formData.password} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="confirm-password-container">
            <CustomInput 
            bgColor={bgColor}
            name='confirm password' type='password' 
            msg='should be same as 🔒password' 
            value={formData['confirm password']} 
            handleChange={handleChange}
            required/>
            </div>
        </div>
        <div className="warning-msg">
            <p>{warning?.msg}</p>
        </div>
        <div className="signup-button-container">
        <CustomButton myStyles={{color: '#97DAC8', backgroundColor: '#194656'}}>Sign Up</CustomButton>
        </div>
    </form>
</div>
</div>
)}

export default SignUp