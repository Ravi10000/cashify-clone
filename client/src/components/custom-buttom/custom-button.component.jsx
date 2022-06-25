const CustomButton = ({children, bordered})=>(
    <button className={`
    px-5 
    h-[50px] 
    rounded-md
    font-semibold 
    border-2 border-primary border-solid
    ${bordered ? ' text-primary hover:bg-primary hover:text-white' 
    : 'bg-primary text-white hover:bg-secondary hover:text-primary hover:border-2 hover:border-primary hover:border-solid'}
    `}>
        {children}
        </button>
)

export default CustomButton