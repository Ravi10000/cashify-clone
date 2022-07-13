import './footer.styles.scss'
import { Link } from 'react-router-dom'
const Footer = ()=>(
        <footer>
            <div className="contacts-link-container">
                <h3>Contact links</h3>
            <a href="mailto:mrphonexcare@gmail.com">mrphonexcare@gmail.com</a>
            <a href="tel:+919667273499">+919667273499</a>
            </div>
            <div className="policies">
                <div className="tos">
                    <Link>terms of services</Link>
                </div>
            </div>
        </footer>
)
export default Footer
