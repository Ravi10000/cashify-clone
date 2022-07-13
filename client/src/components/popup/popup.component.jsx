import './popup.styles.scss'
import {useState, useEffect} from 'react'

const Popup = ({msg, type})=>{
    const [hidePopup, togglePopup] = useState(false)

  useEffect(()=>{
    setTimeout(function() {
      togglePopup(hidePopup => !hidePopup)
         }, 5000);
       },
   [])
    return(
        <div className={`popup ${type}`} style={{display: hidePopup && 'none'}}>
            {
                  msg && 
            <div className="popup-msg">
                   <p>{msg}</p>
            </div>
                }
        </div>
    )
}

export default Popup