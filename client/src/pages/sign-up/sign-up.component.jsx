import './sign-up.styles.scss';
import { useState } from 'react';
// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"

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
    return(
<div className="signup-page">
<div className="container">
<form method='POST' action='/api/user/signup'>
{/* <div className="user h-[100px] bg-secondary p-5 inline-block rounded-full absolute left-[50%] top-[-7%] translate-x-[-50%]">
    <img src="./icons/user.png" alt="" className="h-full"/>
    </div> */}
    <h1 className="form-title">Sign Up Form</h1>
        <div className="inputs-container">
            <div className="email-container">
            <CustomInput 
            name='email' type='email' 
            msg='e.g. handle@gmail.com 📧' 
            value={formData.email} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="phone-container">
            <CustomInput name='phone number' type='number' 
            msg='10 digit 📱mobile number' 
            value={formData['phone number']} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="password-container">
            <CustomInput name='password' type='password' 
            msg='choose something 💪strong'
            value={formData.password} 
            handleChange={handleChange}
            required/>
            </div>
            <div className="confirm-password-container">
            <CustomInput name='confirm-password' type='password' 
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
        <CustomButton>Sign Up</CustomButton>
        </div>
    </form>
</div>
</div>
)}

export default SignUp