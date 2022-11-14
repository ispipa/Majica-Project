export default function Boton({texto, redireccion}){

    return(
        <a href={redireccion}><div id="contenedorBoton">
            <button className="button" >{texto}</button>
            <div className='button0'></div>
        </div></a>
    )
}
