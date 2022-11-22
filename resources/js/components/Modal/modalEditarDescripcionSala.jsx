import { GrDatabase } from "react-icons/gr";
import { useEffect } from "react";
import { useState } from "react";


export default function ModalEditarDescripcion ({usuario,id,aaa}) {
 
    const [descripcion, setDescripcion] = useState("");
    const [nombreSala, setNombreSala] = useState("");


    useEffect(() =>
    {
        setDatos(aaa);
        
    }, [id])

    // const dataBase = async () => {   
      
    //     const response = await axios.get("http://localhost:8000/api/sala/"+id+"?sala=descripcion&idUsuario="+usuario);
    //     const sala = response.data[0];
    //     if(sala){
    //         console.log(sala);
    //         setDatos(sala)
    //     } else{
    //         setDescripcion("");
    //         setNombreSala("");
    //     }
    // }

    const setDatos = (sala)=>{
        console.log(sala)
        if(sala.descripcion_sala != "" || sala.nombre_sala != ""){
                setDescripcion(sala.descripcion_sala);
                setNombreSala(sala.nombre_sala);
            
        } else{
            setDescripcion("");
            setNombreSala("");
        }
    }


    return(
        <div className="containerModalEditarDescripcion">
            <form action="">
                <label htmlFor="nombreSala">
                    Nombre De La Sala
                    <input type="text" id="nombreSala" value={descripcion}/>
                </label>
                <label htmlFor="descripcionSala">
                    Descripción De La Sala
                    <input type="text" id="descripcionSala" />
                </label>

            </form>
        </div>
    )
}