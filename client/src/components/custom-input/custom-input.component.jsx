import './custom-input.styles.scss'
const CustomInput = ({ name, msg, isShort, handleChange, ...otherProps})=>(
    <div className="custom-input flex flex-col group">
        <label 
        htmlFor={name}
        className={`label group-hover:text-primary ${isShort ? 'uppercase' : 'capitalize'}`}
        >{name}</label>
        <input 
        name={name} 
        id={name}
        onChange={handleChange}
        {...otherProps}
        className="custom-input 
        border-2 border-solid border-stone-400 rounded-[2px]
        outline-none 
         group-hover:border-primary 
         focus:border-primary px-2 py-1 bg-white w-full"
        />
        <p className="text-sm text-stone-500">{msg}</p>
    </div>
)

export default CustomInput