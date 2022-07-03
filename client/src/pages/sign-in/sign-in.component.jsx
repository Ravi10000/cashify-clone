import './sign-in.styles.scss'
import { Link } from 'react-router-dom'
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
const SignIn = ()=>{
    return(
<div className="signin-page">
<h3>Don't have an account? <Link to='/signup'><span>Sign-up</span></Link></h3>
<div className="container">
<form method='POST' action='/api/user/signin'>
    {/* <div className="user-img">
    <img src="./icons/user-2.png" alt="" className=""/>
    </div> */}
    <h1 className="form-title">Sign In Form</h1>
        <div className="inputs-container">
            <div className="username-input-container">
            <CustomInput name='username' type='text' msg='e.g. mail@gmail.com 📧' required/>
            </div>
            <div className="password-input-container">
            <CustomInput name='password' type='password' msg='enter your 🔒secure password here' required/>
            </div>
        </div>
        <div className="signin-button-container">
        <CustomButton>Sign In</CustomButton>
        </div>
    </form>
</div>
</div>
)}

export default SignIn