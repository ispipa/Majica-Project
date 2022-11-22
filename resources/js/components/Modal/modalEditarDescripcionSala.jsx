import { GrDatabase } from "react-icons/gr";
import { useEffect } from "react";
import { useState } from "react";
import { update } from "lodash";


export default function ModalEditarDescripcion ({idSala,datasala,ocultarModalDescripcion,setDatosSala}) {
 
    const [descripcion, setDescripcion] = useState("");
    const [nombreSala, setNombreSala] = useState("");


    useEffect(() =>
    {
        setDatos(datasala);
        
    }, [datasala]);

    

    const setDatos = (datasala)=>
    {

        setDescripcion(datasala.descripcion_sala);
        setNombreSala(datasala.nombre_sala);
    }

    const setNombre =(e)=>
    {
        setNombreSala(e.target.value);
        console.log(idSala)
    }

    const setDescripcionSala =(e)=>
    {
        setDescripcion(e.target.value);
    }

    const update = async (e) =>
    {    
        await axios.put("http://localhost:8000/api/sala/"+datasala.id+"?update=descripcion" , {
            'nombre_sala':nombreSala,
            'descripcion_sala': descripcion
        });
        setDatosSala(e);

    }
    

    return(
        <div className="containerModalEditarDescripcion">
            <button onClick={ocultarModalDescripcion}>VOLVER</button>
            {/* <form action=""> */}
                <label htmlFor="nombreSala">
                    Nombre De La Sala
                    <input 
                        type="text" 
                        id="nombreSala" 
                        value={nombreSala}
                        onChange={setNombre}
                    />
                </label>
                <label htmlFor="descripcionSala">
                    Descripción De La Sala
                    <input 
                        type="text" 
                        id="descripcionSala" 
                        value={descripcion} 
                        onChange={setDescripcionSala}
                    />
                </label>
                <button id={datasala.id} type="button" onClick={update}>Editar</button>
            {/* </form> */}
        </div>
    )
}