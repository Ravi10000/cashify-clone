import CustomButton from "../../components/custom-buttom/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
const SignIn = ()=>{
    return(
<div className="signin w-screen flex justify-center mt-20 relative">
<form method='POST' action='/user/signin' className="w-1/3 h-[400px] bg-secondary p-10 rounded-md">
    <div className="user h-[100px] bg-secondary p-5 inline-block rounded-full absolute left-[50%] top-[-5%] translate-x-[-50%]">
    <img src="./icons/user-2.png" alt="" className="h-full"/>
    </div>
    <h1 className="font-semibold border-b-4 border-solid border-primary mb-5">Sign In Form</h1>
        <CustomInput name='username' type='email' msg='e.g. handle@gmail.com 📧'/>
        <br />
        <CustomInput name='password' type='password' msg='enter your 🔒password here '/>
        <br />
        <CustomButton>Sign In</CustomButton>
    </form>
</div>
)}

export default SignIn