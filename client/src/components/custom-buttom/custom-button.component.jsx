// styles import
import { useState, useEffect } from 'react'
import './custom-button.styles.scss'

const CustomButton = ({children, myStyles, secondary, ...otherProps})=>{
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
    return(
    <button 
    onMouseOver={onHover}
    onMouseOut={onOut}
    style={styles}
    className={`custom-button ${secondary && 'secondary-button'}`} 
    {...otherProps}>
        {children}
        </button>
)}

export default CustomButton