import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div className="header">
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/map">Mapas</Link></li>
            </ul>
        </div>
    )
}
