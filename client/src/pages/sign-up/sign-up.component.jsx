// component imports
import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"

const SignUp = ()=>{
    return(
<div className="signin w-screen flex justify-center mt-20 mb-10 relative">
<form method='POST' action='/api/user/signup' className="w-1/3 bg-secondary p-10 rounded-md">
<div className="user h-[100px] bg-secondary p-5 inline-block rounded-full absolute left-[50%] top-[-7%] translate-x-[-50%]">
    <img src="./icons/user.png" alt="" className="h-full"/>
    </div>
    <h1 className="font-semibold border-b-4 border-solid border-primary mb-5">Sign Up Form</h1>
        <CustomInput name='email' type='email' msg='e.g. handle@gmail.com 📧'/>
        <br />
        <CustomInput name='phone' type='number' msg='10 digit 📱mobile number' maxlength="10"/>
        <br />
        <CustomInput name='password' type='password' msg='choose something 💪strong'/>
        <br />
        <CustomInput name='confirm-password' type='password' msg='should be same as 🔒password'/>
        <br />
        <CustomButton>Sign Up</CustomButton>
    </form>
</div>
)}

export default SignUp