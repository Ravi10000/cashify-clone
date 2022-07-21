// styles import
import { useState, useEffect } from 'react'
import './custom-button.styles.scss'

const CustomButton = ({children, myStyles, secondary, handleClick, isLoading, ...otherProps})=>{
    const [styles, setStyles] = useState({})
    useEffect(()=>{
        myStyles 
        && setStyles({
            ...myStyles, 
            borderColor: myStyles.backgroundColor, 
            borderWidth: '2px', 
            borderStyle: 'solid',
        })
    }, [setStyles, myStyles])
    const onHover = e=>{
        myStyles 
        && setStyles({
            color: myStyles.backgroundColor, 
            backgroundColor: myStyles.color, 
            borderColor: myStyles.backgroundColor, 
            borderWidth: '2px', 
            borderStyle: 'solid',
        })
    }
    const onOut = e=>{
        myStyles 
        && setStyles({
            ...myStyles, 
            borderColor: myStyles.backgroundColor, 
            borderWidth: '2px', 
            borderStyle: 'solid'
        })
    }
    const loaderStyles = !myStyles ? {
        display: isLoading && 'inline-block'
    } : {
        display: isLoading && 'inline-block',
        borderColor: myStyles.color ? myStyles.color : '#223963',
        borderTopColor: myStyles.backgroundColor ? myStyles.backgroundColor : '#fff'
    }
    return(
    <button 
    onMouseOver={onHover}
    onMouseOut={onOut}
    style={styles}
    onClick={
        //handleClick && handleClick}
        () =>{
        handleClick && handleClick()
    } }
    className={`custom-button ${secondary && 'secondary-button'}`} 
    {...otherProps}>
        {children} 
        <div className="loader" style={loaderStyles}></div>
        </button>
)}

export default CustomButton