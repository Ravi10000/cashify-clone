// styles import
import './custom-button.styles.scss'

const CustomButton = ({children, secondary, ...otherProps})=>(
    <button className={`custom-button
    ${secondary && 'secondary-button'}
    `} {...otherProps}>
        {children}
        </button>
)

export default CustomButton