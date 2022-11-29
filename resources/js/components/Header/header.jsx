import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {

    const [panel, setPanel] = useState(false)
    const location = useLocation();
    const [images, setImages] = useState("")

    useEffect(() => {
        location.pathname === "/" ? setPanel(false) : " "
    }, [location.pathname])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user'))) {
            setImages(JSON.parse(localStorage.getItem('user')).image)
        }
    })

    const panelUser = () => {
        setPanel(panel === false ? true : false)
        //setPanel(true)
        // location.pathname === "/" ? setPanel(false) : setPanel(panel === false ? true : false)
        console.log(panel);
    }

    const panelUs = () => {
        setPanel(false)
        axios.get("http://127.0.0.1:8000/api/logout", { headers: { "Autorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
            console.log(res)
        })
            .catch(err => {
                console.log(err)
            })
    }

    // console.log(location.pathname);

    return (
        <div className="header">
            <div className="image-icon-user">
                {location.pathname === "/" ? <></> : <img src={images} alt="hola" onClick={panelUser} />}
                <Link to="/">
                    <div className={panel ? "content-closeSesion-v" : "content-closeSesion"}>
                        <p onClick={panelUs}>Cerrar Sesion</p>
                    </div></Link>
            </div>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/map">Mapas</Link></li>
                <li><Link to="/checkout">CheckOut</Link></li>
                <li><Link to="/checkoutNow">CheckOutNow</Link></li>
            </ul>
        </div>
    )
}