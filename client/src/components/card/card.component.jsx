import './card.styles.scss'
import { withRouter } from "react-router-dom";

const CardItem = ({id, title, price, imageUrls, quality, ram, storage, history, match})=> {    
    console.log('match', match);
    console.log('history', history);
    return(
    <div className="card"
         onClick={() => history.push(`/product/${id}`)}>
        <div className="image-container">
            <img 
            alt={title}
            src={imageUrls && imageUrls[0]}
            className='image'
            />
        </div>
        <div className="info-container">
            <h3 className="name"
            >{title}</h3>
            <p className='memory'>
                <span>{ram}Gb</span><span> / {storage}Gb</span>
            </p>
            <p>{quality} quality</p>
            <p className="price">{`₹ ${price} only`}</p>
        </div>
            {/* <div className={`
            h-[80px] 
            w-[80px] 
            border-solid
            border-2
            border-stone-300
            flex justify-center items-center 
            rounded-full
            capitalize
            absolute
            top-[-25px]
            right-[-25px]
            ${quality === 'superb' && 'bg-superb'}
            ${quality === 'best' && 'bg-best'}
            ${quality === 'good' && 'bg-good'}
            `}>
                <p>
                {quality}
                </p>
            </div> */}
    </div>
)}

export default withRouter(CardItem)