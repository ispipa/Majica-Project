import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import Volver from '../assets/cerca.png';
import { BsFillBagCheckFill } from "react-icons/bs";
import { useSubmit } from 'react-router-dom';


const Modal = ({ id, piso, disponibilidad, verModal, volver, usuario, pintarSalasOcupadas,
                   setVerModal, setVolver, setId, descripcion, precio1, precio2, }) => {

                       
                       //ESTADOS---
    const [checkAgregado, setCheckAgregado] = useState(false);
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [registros, setRegistros] = useState([]);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [contadorCompra, setContadorCompra] = useState(0);
    // const [usuario, setUsuario] = useState(0);

 
    
    useEffect(() =>
    {
    
        dataBase();
        
    }, [id])

    
    //CONSULTA A LA BASE DE DATOS
    const dataBase = async () => {
        setPrecio("");
        setcheck("");
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const usuarioData = response.data.reverse();
        setContadorCompra(usuarioData.length)
        setRegistros(usuarioData)

    }

    //OBTENGO EL VALOR DEL CHECKBOX Y EL PRECIO SELECCIONADO
    const actualizarCheck = (e) =>
    {
        setcheck(e.target.id)
        setPrecio(e.target.value)
    }





    
    //AGREGAR
    const agregar = async ()=>{
       
        document.querySelector(".botonAgregar").classList.add("button__loader");
       
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const sala = response.data;
        console.log(sala)
        //Si no ha seleccionado un precio, mando un alerta.
        if (precio == "" )
        {
            setError(true);
        }
        // Si el registro aun no existe en la base de datos, lo agrego.
        else if (sala.findIndex(element => element.sala_pagos == id) < 0)
        {
            axios.post('http://localhost:8000/api/pago', {
                'usuario': usuario,
                'pagado': 'false',
                'precio':precio,
                'piso':piso,
                'sala':id
            });
            estadoSala("Ocupado", id)
            // Reinicio los checkboxes
            setError(false);
            setPrecio("");
            setcheck("");
            dataBase();
            checkVerifiqued();
            
            
        }
        //Si el registro ya existe en la base de datos, edito el precio
        else
        {
            editar(sala);
            dataBase();
            checkVerifiqued();
        }
    }

   


    //EDITAR
    const editar = async (sala) =>
    {
        //optengo el id de la sala que se va a editar
        const idSalaUpdate = sala.find(element => element.sala_pagos == id).id
        await axios.put("http://localhost:8000/api/pago/"+idSalaUpdate , {
            'precio': precio,
            'pagado': 'false'
        });
    }

    //ELIMINAR
    const eliminar = async (idSalaDelete) =>
    {
        await axios.delete("http://localhost:8000/api/pago/"+idSalaDelete);
        dataBase();
        estadoSala("Disponible",idSalaDelete);
        // estadoSala("Disponible", "remove", idSalaDelete)
    }


    const estadoSala = async (disponibilidad,id)=>{
        await axios.put("http://localhost:8000/api/sala/estado/"+id+"?update=estado" , {
          "activo": disponibilidad
        });
        pintarSalasOcupadas();
        
    }


    //Mostrar un check en el boton de agregar al ser agregado a lista de compra.
    const checkVerifiqued=()=>{
        setTimeout(function() {
            setCheckAgregado(true);
            document.querySelector(".botonAgregar").classList.remove("button__loader");
         }, 500);
         
        setTimeout(function() {
            checkFalse();
         }, 4000);

         const checkFalse = ()=>{
            setCheckAgregado(false);
        };
    }

    //BOTON DE VOLVER
    const volverBtn1 = () =>
    {
        setVolver(false);
        setVerModal(false);
        document.querySelector(".botonesPisos").classList.remove("displayFlex");
        document.querySelector(".containerMapaGrande").classList.remove("paddingBottom");
    }

    //MOSTRAR LA TABLA DE COMPRA
    const mostratTablaCompra = ()=>{
        setMostratTabla(false);
    }
    //OCULTAR LA TABLA DE COMPRA
    const ocultarTablaPagar =  ()=>{
        setMostratTabla(true);
    }




    return (
        <div>
            <div className='divContadorCompra'>
                <p className='contadorCompra'>
                    {contadorCompra}
                </p>
                <button
                    onClick={mostratTablaCompra}
                    className='btnMostrarTabla'>
                    <BsFillBagCheckFill />
                </button>
            </div>
            <div
                className={ volver ? 'volver2 volver2V' : 'volver2'}
                onClick={() => volverBtn1()}>
                <img src={Volver}/>
            </div>
            <div className={ verModal ? 'modal modalVisible' : 'modal'}>
                <div
                    className='volver'
                    onClick={() => volverBtn1()}>
                    <img src={Volver} />
                </div>
                <div className='containerModal'>
                    <div className='containerModalHijo'>
                        <div className='headerModal'>
                            <div className='numPiso'>
                                <h1 >
                                    Sala
                                </h1>
                                <h1
                                    style={{opacity: id != "" ? "1" : "0" }}>
                                    {id}
                                </h1>
                            </div>
                            <h1
                                className='disponibilidad'
                                style={{ color: disponibilidad == "Disponible" ? "#afffad" : "red" }}>
                                { disponibilidad }
                            </h1>
                        </div>
                        <div className={
                            disponibilidad == "Disponible" ? "descripcionMapa none" : "descripcionMapa" } >
                            <p
                                className='descripcionSala'>
                                {descripcion}
                            </p>
                        </div>
                        <div className={
                            disponibilidad == "Disponible" ? "descripcionModal" : "descripcionModal none" } >
                            <div className='preciosModal' >
                                <p
                                    className='seleccione'
                                    style={{ display: errorr === true ? "block" : "none" }}>
                                    Selecccionar un precio
                                </p>
                                <p
                                    style={{ display: errorr === false ? "block" : "none" }}
                                    className='pPrecios'>
                                    Precios
                                </p>
                                <div className='precioBtn'>
                                    <label
                                        className={errorr === true ? 'modalAbvertencia' : 'pSpan'}
                                        for="1" >
                                        <input
                                            id="1"
                                            name='1'
                                            type="radio"
                                            value={precio1}
                                            className='checkbox'
                                            onClick={actualizarCheck}
                                            checked={check == "1" ? true : false}
                                        />
                                        <p className={ precio1 == undefined ? "nonePrecio" : "precio1" } > { precio1 == undefined  ? "" : "" }{ disponibilidad == "Disponible"  ? precio1+" € " : "" }</p>
                                        <p className={ precio1 == undefined ? "noneMes" : "precio1M" }  >{ disponibilidad == "Disponible"  ? " 1 Mes" : "" }   </p>
                                    </label>
                                </div>
                                <div className='precioBtn'>
                                    <label
                                        className={errorr === true ? 'modalAbvertencia' : 'pSpan'}
                                        for="2" >
                                        <input
                                            id="2"
                                            type="radio"
                                            value={precio2}
                                            className='checkbox'
                                            onClick={actualizarCheck}
                                            checked={check == "2" ? true : false}
                                        />
                                        <p className={ precio2 == undefined ? "nonePrecio" : "precio2" } >{ precio2 == undefined  ? "" : "" }{ disponibilidad == "Disponible"  ? precio2+" € " : "" } </p>
                                        <p className={ precio2 == undefined ? "noneMes" : "precio2M" }  >{ disponibilidad == "Disponible"  ? " 3 Meses" : "" } </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            // style={{ display: disponibilidad === "ocupado" ? "none" : "block" }}
                            className={disponibilidad === "Ocupado" ? "botonAgregarNone" : "botonAgregar" }
                                     
                            onClick={agregar}>
                            {/* AÑADIR A LA COMPRA */}
                            <span className={checkAgregado === true ?'checkVisible': 'check'}><AiFillCheckCircle/></span>
                        </button>












                    </div>
                </div>
            </div>
            <div className={mostrarTabla === true ? 'tablaCompra': 'tablaCompra MostrartablaCompra'}>
                <FormularioPago
                    datos={registros}
                    eliminar={eliminar}
                    setId={setId}
                    ocultarTablaPagar={ocultarTablaPagar}
                />
            </div>
        </div>
    )
}

export default Modal;
