// styles import
import './custom-button.styles.scss'

const CustomButton = ({children, bordered, ...otherProps})=>(
    <button className={`custom-button
    h-[45px] 
    rounded-md
    font-semibold 
    border-2 border-primary border-solid
    ${bordered ? ' text-primary hover:bg-primary hover:text-white' 
    : 'bg-primary text-white hover:bg-secondary hover:text-primary hover:border-2 hover:border-primary hover:border-solid'}
    `} {...otherProps}>
        {children}
        </button>
)

export default CustomButton