
import { withRouter } from "react-router-dom";

const CardItem = ({id, title, price, imageUrl, quality, ram, storage, history, match})=> {    
    console.log('match', match);
    console.log('history', history);
    return(
    <div className="card 
                    flex 
                    justify-between 
                    items-center 
                    h-[200px] 
                    w-[35vw] 
                    mt-10 
                    p-5 
                    shadow-md 
                    border-grey-200 border-solid border-[.5px] rounded-sm
                    cursor-pointer
                    relative
    " onClick={() => history.push(`/product/${id}`)}>
        <div className="h-[180px]">
            <img 
            alt={title}
            src={imageUrl && imageUrl[0]}
            className='h-full'
            />
        </div>
        <div className="right h-[80%] w-[55%]">
            <h3 className="
            capitalize
            font-semibold
            mb-2
            "
            >{title}</h3>
            <p className="font-semibold  
            text-sm 
            mt-[-10px] mb-2
            ">
                <span>{ram}Gb</span><span> / {storage}Gb</span>
            </p>
            <p className="capitalize">{quality} quality</p>
            <p className="text-green-600 mt-2 font-medium">{`₹ ${price} only`}</p>
        </div>
            <div className={`
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
            </div>
    </div>
)}

export default withRouter(CardItem)