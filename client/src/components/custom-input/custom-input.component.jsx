import './custom-input.styles.scss'
import {useState, useEffect} from 'react'
const CustomInput = ({ bgColor, name, msg, isShort, type, validateInput, register, ...otherProps})=>{
const [show, setShow] = useState(true)
const [inputType, setType] = useState(null)

let inputIconUrl = `/icons/${type}.png`

console.log(type, inputIconUrl)
useEffect(()=>{
setType(type)
}, [type])

function toogleShow(e){
    setShow(show => !show)
    setType(type => type === 'password' ? 'text': 'password' )
}



return(
    <div className="custom-input">
        <input 
        type={inputType ? inputType : 'text'}
        {...register}
        style={bgColor &&{backgroundColor: bgColor}}
        name={name} 
        id={name}
        onBlur={validateInput}
        {...otherProps}
        className="input" autoComplete='off'/>
        <label 
        htmlFor={name}
        className={`label ${isShort ? 'uppercase' : 'capitalize'}`}
        >{name}</label>
        {
            <div className='input-icon'>
            <img src={inputIconUrl} alt="" />
            </div>
            }
        <p className="msg">{msg}</p>
        {
            type === 'password' 
            && <div className='show-hide' onClick={toogleShow}>
            <img src={show ? "/icons/eye.png" : "/icons/eye-closed.png"} alt="show" />
        </div>
        }
    </div>
)
    }
export default CustomInput