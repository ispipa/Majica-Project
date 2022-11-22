import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div className="header">
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/map">Mapas</Link></li>
                <li><Link to="/checkout">CheckOut</Link></li>
                <li><Link to="/checkoutNow">CheckOutNow</Link></li>
            </ul>
        </div>
    )
}
