import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function FormularioPago({ datos, eliminar, setId, ocultarTablaPagar }) {

    //ALMACENO TODOS LOS PRECIOS EN UN ARRAY
    const precios = [];
    //RECORRO EL ARRAY DE PRECIOS
    datos.forEach(element => {
        precios.push(parseInt(element.precio_pagos))
    });
    //SUMO TODOS LOS PRECIOS DE ARRAY
    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    //REDIRECCIONAR A PAGAR

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(15)

    useEffect(() => {
        if (precios.length >= 1) {
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
                if (seconds === 0) {
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                }
            }, 1000);
            if (minutes === 9 && seconds === 59) { alert("Tiene 10 minutos para realizar la reserva") };
            if (minutes === 4 && seconds === 59) { alert("Tiene 5 minutos para realizar la reserva") };
            if (minutes === 0) {
                alert("Se le ha acabado el plazo para realizar la reserva, por favor intente de nuevo en el tiempo establecido")
                clearInterval(interval);
                setSeconds(0);
                setMinutes(15);
            };

            return () => clearInterval(interval)
        } else {
            setSeconds(0);
            setMinutes(15);
        }
    },)

    const comprobarUsuario = () => {
        ( localStorage.getItem('user') && localStorage.getItem('token') ) === null ?
        alert("Debe iniciar sesión para realizar la reserva") :
        axios.get('http://127.0.0.1:8000/api/verified-middleware-example',{ headers:
                {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
        }).then(res => navigate('/CheckoutNow'))
            .catch(err => {
                enviarEmail();
            })
    }

    const enviarEmail = () => {
        toast.error('Tienes que verificar tu correo primero');
        axios.post('http://127.0.0.1:8000/api/email/verification-notification',{},{ headers:
                {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`}

        }).then(res => console.log(res))
            .catch(err => {
                toast.error('Hubo un problema. Intenta más tarde.');
            })
    }

    return (
        <div className='containerPadrePagar'>
            <Toaster />
            <div
                onClick={ocultarTablaPagar}
                className="ocultarTablaPagar">
                <GrClose />
            </div>
            <div className='containerPagar'>
                <table className='tablaPagar' >
                    <tbody>
                        <tr className="tr">
                            <th>SALA</th>
                            <th>PISO</th>
                            <th>PRECIO</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                    {datos.map(ar => {
                        return (
                            <tr className="tr2">
                                <td
                                    className="nSala"
                                    id={ar.sala_pagos}
                                    onClick={setId}>
                                    {ar.sala_pagos}
                                </td>
                                <td
                                    className="nPiso"
                                    id={ar.sala_pagos}
                                    onClick={setId}>
                                    {ar.piso_pagos}
                                </td>
                                <td
                                    className="precio"
                                    id={ar.sala_pagos}
                                    onClick={setId}>
                                    {ar.precio_pagos}€
                                </td>
                                <td
                                    className="borrar"
                                    onClick={() => eliminar(ar.sala_pagos)}>
                                    <TiDelete />
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div className="divTotal">
                <p className={precios.length >= 1 ? "timer" : "display : none"}>Tiempo de Reserva: {seconds < 10 ? `${minutes}:0${seconds}` : minutes + ":" + seconds}</p>
                <button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button>
                <p className='total'>
                    Total : {total}€
                </p>
            </div>
        </div>
    )
}
