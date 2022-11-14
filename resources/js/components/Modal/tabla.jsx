import { TiDelete } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom"

export default function FormularioPago({datos, eliminar, setId, ocultarTablaPagar }){

    //ALMACENO TODOS LOS PRECIOS EN UN ARRAY
    const  precios = [];
    //RECORRO EL ARRAY DE PRECIOS
    datos.forEach(element => {
        precios.push(parseInt(element.precio_pagos))
    });
    //SUMO TODOS LOS PRECIOS DE ARRAY
    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    // const updateId = async (sala) =>{
    //     // setModal()
    //     const response = await axios.get("http://localhost:8000/api/sala/"+sala);
    //     const responseData = response.data;
    //     setPrecios({"precio1":  responseData.precio_sala, "precio2": responseData.precio_sala})
    //     console.log(precios)
    // }

    return(
        <div className='containerPadrePagar'>
            <div
                onClick={ocultarTablaPagar}
                className="ocultarTablaPagar">
                <GrClose/>
            </div>
            <div className='containerPagar'>
                <table className='tablaPagar' >
                    <tr className="tr">
                        <th>SALA</th>
                        <th>PISO</th>
                        <th>PRECIO</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {datos.map(ar => {
                        return(
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
                                    onClick={()=>eliminar(ar.sala_pagos)}>
                                    <TiDelete />
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div className="divTotal">
                <button className='botonPagarr'><Link to="/checkout">Pagar</Link></button>
                <p className='total'>
                    Total : {total}€
                </p>
            </div>
        </div>
    )
}
