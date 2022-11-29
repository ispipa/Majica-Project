import { GrDatabase } from "react-icons/gr";
import { useEffect } from "react";
import { useState } from "react";
import { update } from "lodash";


export default function ModalEditarDescripcion ({updateDescripcion,datasala,ocultarModalDescripcion,setDatosSala}) {
 
    const [descripcion, setDescripcion] = useState("");
    const [nombreSala, setNombreSala] = useState("");

    useEffect(() =>
    {
        setDatos(datasala);
    }, [datasala]);

    
    //OBTENGO LOS DATOS DE LA SALA
    const setDatos = (datasala)=>
    {
        setDescripcion(datasala.descripcion_sala);
        setNombreSala(datasala.nombre_sala);
    }

    //OBTENGO EL VALOR DEL INPUT NOMBRE
    const setNombre =(e)=>
    { 
        setNombreSala(e.target.value);
    }

    //OBTENGO EL VALOR DEL INPUT DESCRIPCION
    const setDescripcionSala =(e)=>
    {
        setDescripcion(e.target.value);
    }

    //EDITO LA DESCRIPCION EN LA BASE DE DATOS Y LOS ESTADOS DE NOMBRE Y DESCRIPCIONSALA
    const update = (e) =>
    {    
        const inputNombre = document.querySelector(".inputNombre").value;
        const inputDescripcion = document.querySelector(".inputDescripcion").value;
        //Valido que los inputs no esten vacios
        if(inputNombre != "" && inputDescripcion != ""){
            //Lo edito en la base de datos
             axios.put("http://localhost:8000/api/sala/"+datasala.id+"?update=descripcion" , {
                'nombre_sala':nombreSala,
                'descripcion_sala': descripcion
            });
            //Edito el ESTADO de nombre y descripcion
            updateDescripcion(nombreSala,descripcion)
        } 
        else{
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