
import { AiFillCheckCircle } from "react-icons/ai";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import Volver from '../assets/cerca.png';
import { BsFillBagCheckFill } from "react-icons/bs";
import { useSubmit } from 'react-router-dom';
import Modal_usuarioNoLogueado from './modal_UsuarioNoLogueado'


const Modal = ({ id, nombreSala, piso, disponibilidad, verModal, volver, usuario,  pintarSalasOcupadas,
                   setVerModal, setVolver, setId, descripcion, precio1, precio2, cambiarPrecioSeleccionado,
                //    setDataBaseUpdate,  
                dataCarrito }) => {

                       
    //ESTADOS---
    const [checkAgregado, setCheckAgregado] = useState(false);
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [mensual, setMensual] = useState(true);
    const [trimestral, setTrimestral] = useState(true);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [contadorCompra, setContadorCompra] = useState(0);
    // const [usu, setUsu] = useState(usuario);
   
 
    useEffect( () =>
    {
        if(usuario > 0){
            carritoCompra();
        } 
    }, [ id , usuario,  ]);

    
    //CONSULTA DATOS DEL CARRITO
    const carritoCompra = async () => {
        setPrecio("");
        setcheck("");
        //Se obtiene los datos del Carrito de compras
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const carritoCompra  = response.data.reverse();
        setCarrito(carritoCompra);
        setContadorCompra(carritoCompra.length);

        if(carritoCompra.length > 0){
            if(carritoCompra[0].mes_pago === 'trimestral'){
                setMensual(false);
                setTrimestral(true);
            } else if(carritoCompra[0].mes_pago === 'mensual'){
                setMensual(true);
                setTrimestral(false);
            } else{
                setMensual(true);
                setTrimestral(true);
            }
        }
    }


    //OBTENGO EL VALOR DEL CHECKBOX Y EL PRECIO SELECCIONADO
    const actualizarCheck = (e) =>
    {
        setcheck(e.target.id)
        setPrecio(e.target.value)
    }

    
    //AGREGAR AL CARRITO ( VALIDACIONES )
    const agregarAlCarrito = async ()=>
    {  
        document.querySelector(".botonAgregar").classList.add("button__loader");
        const response = await axios.get("http://localhost:8000/api/pago?usuario="+usuario);
        const carrito  = response.data;
        //Si el usuario ya esta logueado se agrega a la lista de compra (carrito)
        if(usuario > 0){
            console.log(carrito)
            //Si no ha seleccionado un precio, mando un alerta.
            if (precio == "" ){
                setError(true);
                document.querySelector(".botonAgregar").classList.remove("button__loader");
            }
            // Si el registro aun no existe en la base de datos, lo agrego.
            else if (carrito.findIndex(element => element.sala_pagos == id) < 0){
               agregoAlCarrito_dom();
            }
            //Si el registro ya existe en la base de datos, se edita el precio.
            else{
                editar(carrito);
                carritoCompra();
                checkVerifiqued();
            }
        }  
        else
        {
            Alerta_usuarioNoLogueado();
            document.querySelector(".botonAgregar").classList.remove("button__loader");
        }     
    }
   
    //AGREGAR EN LA TABLA ( CARRITO )
    const agregoAlCarrito_dom =  ()=>{

        
        const dataSala = {
            'usuario': usuario,
            'pagado': 'false',
            'precio_pagos':precio,
            'piso_pagos':piso,
            'sala_pagos':id,
            'mes_pago': check == "1" ? 'mensual' : 'trimestral'

        }
        
        setCarrito([...carrito, dataSala]);
        agregoAlCarrito_BD(dataSala);
        estadoSala("Ocupado", id);
        setError(false);
        setPrecio("");
        setcheck("");
        checkVerifiqued();
        setContadorCompra(contadorCompra + 1);
        pintarSalasOcupadas();
        
        if(check == 1){
            setMensual(true);
            setTrimestral(false);
        } else{
            setMensual(false);
            setTrimestral(true);
        }
        
    
    }


    


    //AGREGAR AL CARRITO EN LA BASE DE DATOS
    const agregoAlCarrito_BD =  (dataSala)=>{
        axios.post('http://localhost:8000/api/pago', dataSala);
    }


    //EDITAR (BD)
    const editar = (sala) =>
    {
        //optengo el id de la sala que se va a editar
        const idSalaUpdate = sala.find(element => element.sala_pagos == id).id
        axios.put("http://localhost:8000/api/pago/"+idSalaUpdate , {
            'precio': precio,
            'pagado': 'false'
        });
    }

   
  


    //ELIMINAR ( DOM / BD )
    const eliminar =  (idSalaDelete) =>
    {  
        // updateUsuario("0",idSalaDelete);
        const salaDelete = carrito.filter(element => element.sala_pagos !== idSalaDelete)
        setCarrito(salaDelete);
        axios.delete("http://localhost:8000/api/pago/"+idSalaDelete);
        estadoSala("Disponible",idSalaDelete);
        pintarSalasOcupadas();
        setContadorCompra(contadorCompra - 1);
        if(contadorCompra == 1){
            setMensual(true);
            setTrimestral(true);
        }
    }


    //FUNCION PARA CAMBIAR EL ESTADO DE LA SALA ( Disponible / Ocupado )
    const estadoSala =  (disponibilidad,id)=>{
         axios.put("http://localhost:8000/api/sala/"+id+"?update=estado" , {
          "activo": disponibilidad,
        });
        pintarSalasOcupadas();
    }


    //Mostrar un check en el boton de agregar al ser agregado a lista de compra.
    const checkVerifiqued=()=>{
        setTimeout(function() {
            setCheckAgregado(true);
            document.querySelector(".botonAgregar").classList.remove("button__loader");
         }, 0);
         
        setTimeout(function() {
            checkFalse();
         }, 2000);

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

    //MOSTRAR ALERTA DE USUARIO NO LOGUEADO
    const Alerta_usuarioNoLogueado =  ()=>{
        setPrecio("");
        setcheck("");
        setMostrarAlerta(true); 
    }

    //OCULTAR ALERTE DE USUARIO NO LOGUEADO
    const ocultarAlerta =  ()=>{
        setMostrarAlerta(false);
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
                                    {nombreSala}
                                </h1>
                            </div>
                            <h1
                                className='disponibilidad'
                                style={{ color: disponibilidad == "Disponible" ? "#afffad" : "red"  }}>
                                { disponibilidad }
                            </h1>
                        </div>
                        <div className={
                            (disponibilidad == "Disponible") ? "descripcionMapa none" : "descripcionMapa"   } >
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
                                <div className={mensual === true ? 'precioBtn' : 'precioBtn precioBtnNone'}>
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
                                <div className={trimestral === true ? 'precioBtn' : 'precioBtn precioBtnNone'} >
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
                            id={id}
                            onClick={agregarAlCarrito}>
                            {/* AÑADIR A LA COMPRA */}
                            <span className={checkAgregado === true ?'checkVisible': 'check'}><AiFillCheckCircle/></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={mostrarTabla === true ? 'tablaCompra': 'tablaCompra MostrartablaCompra'}>
                <FormularioPago
                    datos={carrito}
                    eliminar={eliminar}
                    setId={setId}
                    ocultarTablaPagar={ocultarTablaPagar}
                    cambiarPrecioSeleccionado={cambiarPrecioSeleccionado}
                />
            </div>
            <div className={mostrarAlerta === true ? 'Modal_usuarioNoLogueadoVisible': 'Modal_usuarioNoLogueado'}>
                <Modal_usuarioNoLogueado ocultarAlerta={ocultarAlerta}/>
            </div>
        </div>
    )
}

export default Modal;

