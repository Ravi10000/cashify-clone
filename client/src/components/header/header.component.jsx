// styles import
import './header.styles.scss'
// react imports
import {useState, useEffect} from 'react'

// components import
import CustomButton from "../../components/custom-buttom/custom-button.component"

// router imports
import { Link } from "react-router-dom"


const Header = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        (async function(){
            const res = await fetch('/user/isLoggedIn')
            const data = await res.json()
            setIsLoggedIn(data)
            console.log(data)
        })()
    }, [])
    const handleClick = async()=>{
        const res = await fetch('/user/signout')
        const data = await res.json()
        setIsLoggedIn(data)
        console.log('isLoggedIn:', data)
    }
    return(
    <div className="header">
        <div className="logo">
            <Link to='/'>
                <span className='highlight'>Mr.</span>
                <span>Phone</span>
                <span className='highlight'>X</span></Link>
        </div> 
        {
            isLoggedIn ? <CustomButton onClick={handleClick}>Sign Out</CustomButton>
            :
        <div className="buttons flex w-2/12 justify-between mr-5">
        <Link to='/signin'>
            <CustomButton>Sign In</CustomButton>
        </Link>
        <Link to='signup'>
            <CustomButton bordered>Sign Up</CustomButton>
        </Link>
        </div>
        }
    </div>
)}

export default Header