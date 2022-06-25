import CustomButton from "../../components/custom-buttom/custom-button.component"
import { Link } from "react-router-dom"
const Header = ()=>(
    <div className="sticky top-0 z-10 bg-secondary w-full h-[70px] flex justify-between items-center">
        <div className="logo ml-5 capitalize text-primary">
            <Link to='/'>mr.phonex</Link>
        </div> 
        <div className="buttons flex w-2/12 justify-between mr-5">
        <CustomButton>Sign In</CustomButton>
        <CustomButton bordered>Sign Up</CustomButton>
        </div>
    </div>
)

export default Header