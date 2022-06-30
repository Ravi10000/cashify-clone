import './sign-up.styles.scss'
// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"

const SignUp = ()=>{
    return(
<div className="signup-page">
<div className="container">
<form method='POST' action='/api/user/signup' className="">
{/* <div className="user h-[100px] bg-secondary p-5 inline-block rounded-full absolute left-[50%] top-[-7%] translate-x-[-50%]">
    <img src="./icons/user.png" alt="" className="h-full"/>
    </div> */}
    <h1 className="form-title">Sign Up Form</h1>
        <div className="inputs-container">
            <div className="email-container">
            <CustomInput name='email' type='email' msg='e.g. handle@gmail.com 📧'/>
            </div>
            <div className="phone-container">
            <CustomInput name='phone number' type='number' msg='10 digit 📱mobile number' maxlength="10"/>
            </div>
            <div className="password-container">
            <CustomInput name='password' type='password' msg='choose something 💪strong'/>
            </div>
            <div className="confirm-password-container">
            <CustomInput name='confirm-password' type='password' msg='should be same as 🔒password'/>
            </div>
        </div>
        <div className="signup-button-container">
        <CustomButton>Sign Up</CustomButton>
        </div>
    </form>
</div>
</div>
)}

export default SignUp