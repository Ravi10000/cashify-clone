import './custom-textarea.styles.scss'

const CustomTextarea = ({label, register, ...otherProps}) => {
    return <div className="custom-textarea">
        <textarea 
        id="message"
        // defaultValue={message}
        {...register}
        {...otherProps} 
        >
        </textarea>
        <label htmlFor="message">{label}</label>
    </div>
}

export default CustomTextarea