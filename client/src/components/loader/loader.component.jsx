import './loader.styles.scss'

const Loader = ({height})=>{
    const loaderStyles = height ? {"height": height} : {};
    return(
        <div className="loader-container" style={{...loaderStyles}}>
            <div className="common-loader"></div>
        </div>
    )
}
        

export default Loader

