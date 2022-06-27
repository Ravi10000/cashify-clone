const CustomInput = ({type, name, msg})=>{
    return(
    <div className="custom-input flex flex-col w-full group ">
        <label 
        htmlFor={name}
        className={`label group-hover:text-primary capitalize`}
        >{name}</label>
        <input 
        required
        type={type} 
        name={name} 
        id={name}
        className="input border-2 border-solid border-stone-400 outline-none rounded-[2px] group-hover:border-primary focus:border-primary px-2 py-1 w-full"
        />
        <p className="text-sm text-stone-500">{msg}</p>
    </div>
)}

export default CustomInput