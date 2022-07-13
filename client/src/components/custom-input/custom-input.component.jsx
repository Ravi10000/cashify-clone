import './custom-input.styles.scss'
const CustomInput = ({ bgColor, name, msg, isShort, validateInput, register, ...otherProps})=>(
    <div className="custom-input">
        
        <input 
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
        <p className="msg"></p>
    </div>
)

export default CustomInput