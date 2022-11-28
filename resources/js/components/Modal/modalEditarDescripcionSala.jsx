import { GrDatabase } from "react-icons/gr";
import { useEffect } from "react";
import { useState } from "react";
import { update } from "lodash";


export default function ModalEditarDescripcion ({datasala,ocultarModalDescripcion,setDatosSala}) {
 
    const [descripcion, setDescripcion] = useState("");
    const [nombreSala, setNombreSala] = useState("");


    useEffect(() =>
    {
        setDatos(datasala);
        console.log(datasala);
    }, [datasala]);

    

    const setDatos = (datasala)=>
    {
        setDescripcion(datasala.descripcion_sala);
        setNombreSala(datasala.nombre_sala);
    }

    const setNombre =(e)=>
    {
        setNombreSala(e.target.value);
    }

    const setDescripcionSala =(e)=>
    {
        setDescripcion(e.target.value);
    }

    const update = async (e) =>
    {    
        const inputNombre = document.querySelector(".inputNombre").value;
        const inputDescripcion = document.querySelector(".inputDescripcion").value;
        if(inputNombre != "" && inputDescripcion != ""){
            await axios.put("http://localhost:8000/api/sala/"+datasala.id+"?update=descripcion" , {
                'nombre_sala':nombreSala,
                'descripcion_sala': descripcion
            });
            setDatosSala(e);
        } else{
            alert("Debe rellenar los dos campos")
        }

    }
    

    return(
        <div className="containerModalEditarDescripcion">
            <button onClick={ocultarModalDescripcion}>VOLVER</button>
            {/* <form action=""> */}
                <label htmlFor="nombreSala" className="inputs1">
                    Nombre De La Sala
                    <input 
                        type="text" 
                        id="nombreSala" 
                        value={nombreSala}
                        onChange={setNombre}
                        className="inputNombre"
                    />
                </label>
                <label htmlFor="descripcionSala" className="inputs1">
                    Descripción De La Sala
                    <input 
                        type="text" 
                        id="descripcionSala" 
                        value={descripcion} 
                        onChange={setDescripcionSala}
                        className="inputDescripcion"
                    />
                </label>
                <button  
                    className="botonEditarDescripcion" 
                    id={datasala.id} 
                    ype="button" 
                    onClick={update}
                    
                    >
                    Editar
                </button>
            {/* </form> */}
        </div>
    )
}