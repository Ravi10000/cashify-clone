import './custom-input.styles.scss'
const CustomInput = ({ bgColor, name, msg, isShort, handleChange, validateInput, ...otherProps})=>(
    <div className="custom-input">
        
        <input 
        style={bgColor &&{backgroundColor: bgColor}}
        name={name} 
        id={name}
        onChange={handleChange}
        onBlur={validateInput}
        {...otherProps}
        className="input" autoComplete='off'/>
        <label 
        htmlFor={name}
        className={`label ${isShort ? 'uppercase' : 'capitalize'}`}
        >{name}</label>
        <p className="msg">{msg}</p>
    </div>
)

export default CustomInput