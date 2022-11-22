import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../Modal/Modal';
import logo from '../assets/logo.png';
import PisoUno_Rojo_SVG from './pisoUno_Rojo_SVG';
import PisoDos_Verde_SVG from './pisoDos_verde_SVG';
import PisoTres_Azul_SVG from './pisoTres_Azul_SVG';
import MapaPequeno_piso1_SVG from './mapaPequeno_piso1_SVG';
import MapaPequeno_piso2_SVG from './mapaPequeno_piso2_SVG';
import MapaPequeno_piso3_SVG from './mapaPequeno_piso3_SVG';
import { json } from 'react-router';

export default function Map() {

    const [idSala, setIdsala] = useState(null);
    const [piso, setPiso] = useState(null);
    const [precios, setPrecios] = useState([]);
    const [volver, setVolver] = useState(false);
    const [boleano, setBoleano] = useState(false);
    const [verPiso1, setVerPiso1] = useState(false);
    const [verPiso2, setVerPiso2] = useState(false);
    const [verPiso3, setVerPiso3] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [verMapaGrande1, setVerMapaGrande1] = useState(true);
    const [verMapaGrande2, setVerMapaGrande2] = useState(false);
    const [verMapaGrande3, setVerMapaGrande3] = useState(false);
    const [disponibilidad, setIDisponibilidad] = useState("");
    const [descripcion, setIDescripcion] = useState(false);
    const [usuario, setUsuario] = useState(0);


    //HAGO UNA CONSULTA PARA PINTAR LAS SALAS OCUPADAS
    useEffect( () =>
    {
        usuarioLogueado();
    },[]);


    const usuarioLogueado = ()=>{

        if(localStorage.getItem("user")){
            const user = JSON.parse(localStorage.getItem("user"));
            pintarSalasCompradas(user.id);
            setUsuario(user.id)

        } else{
            setUsuario("")
            pintarSalasCompradas("");
        }
        pintarSalasOcupadas("add");
    }


    //SE OBTINEN EL ID DE LA SALA
    const setId =  (e) => {
        const id = parseInt(e.target.id);
        setBaseDeDatos(id);
        setModal()

    }


    //CONSULTA A LA BASE DE DATOS
    const setBaseDeDatos = async (id)=>{
        const response = await axios.get("http://localhost:8000/api/sala/"+id);
        const responseData = response.data;
        setDatosSala(responseData)
        pintarSalasOcupadas()

    }


    //SE PINTAN LAS SALAS OCUPADAS
    const pintarSalasOcupadas  = async (add_remove, id)=>{
        const response = await axios.get("http://localhost:8000/api/pago/all");
        const salas = response.data;

        salas.forEach(element => {
            if(add_remove == "add"){
                document.querySelector(".sala"+element.sala_pagos).classList.add("ocupado");
            } else if (add_remove == "remove"){
                document.querySelector(".sala"+id).classList.remove("ocupado");
            }
        });

        // const responsePago = await axios.get("http://localhost:8000/api/pago");
        // const pago = responsePago.data;
        // console.log(pago)


        // const pintar =  (min, max,)=>{
        //     for(let i = min; max > i; i++){

        //         if(salas.find(indice => indice.id === i).activo === "Ocupado"){
        //             document.querySelector(".sala"+i).classList.add("ocupado");
        //         }
        //         else{
        //             document.querySelector(".sala"+i).classList.remove("ocupado");
        //         }
        //     }
        // }

        // pintar(101,129);
        // pintar(201,229);
        // pintar(301,329);
    }



    //PINTAR DE VERDE LAS SALAS COMPRADAS
    const pintarSalasCompradas = async (userId)=>{
        const pagados = await axios.get("http://127.0.0.1:8000/api/sala/usuario?id="+userId);
        const pagado = pagados.data;
        pagado.forEach(element => {
            document.querySelector(".sala"+element.nombre_sala).classList.add("salaComprada");
        });
    }



    //SE OBTIENEN LOS DATOS DE LA SALA
    const setDatosSala = async (sala)=>{
        //si la sala le pertenece al usuario logueado q ese usuario pueda editar la descripcion
        // if(sala.activo === "Ocupado"){
        //   const salaComprada = await axios.get("http://localhost:8000/api/pago/usuario?id="+usuario)
        //   const a = salaComprada.data;
        //   console.log(a)

        // }

        setIDisponibilidad(sala.activo);
        setIdsala(sala.nombre_sala);
        setPiso(sala.piso)
        setIDescripcion(sala.descripcion_sala);
        setPrecios({"precio1": sala.precio_sala, "precio2":sala.precio_sala})
    }


    //MOSTAR EL MODAL
    const setModal = ()=>{
        setIdsala("");
        setVolver(true);//boton de volver
        setVerModal(true);
        setIDescripcion("");
        setPrecios([""])
        document.querySelector(".botonesPisos").classList.add("displayFlex");
        document.querySelector(".containerMapaGrande").classList.add("paddingBottom");
    }



    //SE OCULTAN Y SE MUESTRAN LOS MAPAS GRANDES Y PEQUEÑOS
    const mostrarPiso1 = () => {
        setVerPiso2(false);
        setVerPiso3(false);
        setVerMapaGrande1(true)
        setVerMapaGrande2(false);
        setVerMapaGrande3(false);
    }

    const mostrarPiso2 = () => {
        setVerPiso2(true);
        setVerPiso3(false);
        setVerMapaGrande1(false);
        setVerMapaGrande2(true);
        setVerMapaGrande3(false);
    }

    const mostrarPiso3 = () => {
        setVerPiso1(true);
        setVerPiso2(true);
        setVerPiso3(true);
        setVerMapaGrande1(false);
        setVerMapaGrande2(false);
        setVerMapaGrande3(true);
    }



    return (
        <section className='seccionMapas'>
            <div className='headerMovil'>
                <div className='botonesHeaderMovil'>
                    <button
                        onClick={() => mostrarPiso1()}
                        className="boton">Piso 1
                    </button>
                    <button
                        onClick={() => mostrarPiso2()}
                        className="boton">Piso 2
                    </button>
                    <button
                        onClick={() => mostrarPiso3()}
                        className="boton">Piso 3
                    </button>
                </div>
            </div>
            <Modal
                id={idSala}
                volver={volver}
                setId={setId}
                verModal={verModal}
                setVolver={setVolver}
                setVerModal={setVerModal}
                precio1={precios.precio1}
                precio2={precios.precio2}
                disponibilidad={disponibilidad}
                descripcion={descripcion}
                piso={piso}
                usuario={usuario}
                pintarSalasOcupadas={pintarSalasOcupadas}
            />
            <div className='container2'>
                <div className='containerMapaGrande'>
                    <div
                        className={verMapaGrande1 ? 'piso1MapaGrandeSVG' : 'piso1MapaGrandeSVG noneMapa'}>
                        <PisoUno_Rojo_SVG funcion={setId} />
                    </div>
                    <div
                        className={verMapaGrande2 ? 'piso2MapaGrandeSVG' : 'piso2MapaGrandeSVG noneMapa'}>
                        <PisoDos_Verde_SVG funcion={setId} />
                    </div>
                    <div
                        className={verMapaGrande3 ? 'piso3MapaGrandeSVG' : 'piso3MapaGrandeSVG noneMapa'}>
                        <PisoTres_Azul_SVG funcion={setId} />
                    </div>
                </div>
                <aside className='containerMapaPequeno'>

                    <div className='mapasPequenos'>
                        <div className={verPiso1 ? 'piso1' : 'piso1'}>
                            <MapaPequeno_piso1_SVG />
                        </div>
                        <div className={verPiso2 ? 'piso2' : 'piso2 none'}>
                            <MapaPequeno_piso2_SVG />
                        </div>
                        <div className={verPiso3 ? 'piso3' : 'piso3 none'}>
                            <MapaPequeno_piso3_SVG />
                        </div>
                    </div>
                    <div className='botonesPisos'>
                        <button
                            onClick={() => mostrarPiso1()}
                            className={verMapaGrande1 ? 'boton activo' : 'boton'}>Piso 1
                        </button>
                        <button
                            onClick={() => mostrarPiso2()}
                            className={verMapaGrande2 ? 'boton activo' : 'boton'}>Piso 2
                        </button>
                        <button
                            onClick={() => mostrarPiso3()}
                            className={verMapaGrande3 ? 'boton activo' : 'boton'}>Piso 3
                        </button>
                    </div>
                    <img
                        src={logo}
                        alt="logo virtual museum"
                        className='logo' />
                </aside>
            </div>
        </section>
    )
}
