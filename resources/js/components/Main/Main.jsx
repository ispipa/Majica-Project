import React, { useState } from 'react';
import Usuario from '../assets/usu2.jpg';
import Logo from '../assets/Logo.png'
// import LogoMJ from '../assets/LogoMj.png'
import { useNavigate } from "react-router-dom";
import LogoMJ from '../assets/LogoMJ.png'
import LogoVm from '../assets/Nueva carpeta - copia/LogoVm.png'
import axios from "axios";


export const Main = () => {

    //imagen
    const [title, setTitle] = useState('')

    const huevos = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          // The file's text will be printed here
          console.log(event.target.result)
        };
        reader.readAsText(file);
        setTitle(reader.readAsText(file))
    }

    let navigate = useNavigate();

    const [sign, setSign] = useState(false);

    const Sign_in_btn = () => {
        setSign(true)
    }
    const Sing_up_btn = () => {
        setSign(false)
    }

    const Sign_in = (e) => {
        e.preventDefault();
        let correoUser = e.target.correo.value;
        let passUser = e.target.clave.value;
        axios.post(`http://127.0.0.1:8000/api/login`,
            {
                email: correoUser,
                password: passUser
            }
        ).then(res => {
            if (res.data.message === 'success') {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return navigate('/map');
            }
        })
    }
    const handleImage = (e) =>
    {
        setImg(e.target.files[0]);
    }


    const Sign_up = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', e.target.nombre.value);
        data.append('last_name', e.target.apellidos.value);
        data.append('email', e.target.email.value);
        data.append('password', e.target.password.value);
        data.append('telephone', e.target.telefono.value);
        data.append('address', e.target.dirección.value);
        data.append('artist', e.target.tipo_de_artista.value);
        data.append('type_of_art', e.target.tipo_de_arte.value);
        data.append('description_sala', e.target.descripción.value);
        data.append('image', e.target.img.files[0]);
        console.log(data)
        axios.post("http://127.0.0.1:8000/api/register", data).then(res => {
            if (res.data.message === 'success') {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setSign(false);
            }
            console.log(res)
        })
    }

    return (
        <div>
            <div className={sign ? "container sign-up-mode" : "container"}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form
                            action=""
                            className="sign-in-form formulario__login"
                            method=""
                            onSubmit={Sign_in}
                        >
                            <img src={LogoMJ} className="image" alt="Majica" />
                            <h2 className="title">Iniciar sesion</h2>
                            <div className="content-input">
                                <div className="input-field">
                                    {/* <i className="fas fa-user"></i> */}
                                    <input
                                        name="correo"
                                        type="text"
                                        placeholder="Email"

                                    />
                                </div>
                                <div className="input-field">
                                    {/* <i className="fas fa-lock"></i> */}
                                    <input
                                        name="clave"
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                </div>
                                <div className="btn-register">
                                    <input
                                        type=""
                                        value="Crear Cuenta"
                                        className="btn solid"
                                        onClick={Sign_in_btn}
                                        preventDefault=""
                                    />

                                    <input
                                        type="submit"
                                        value="Iniciar sesion"
                                        className="btn solid"
                                    />

                                </div>
                            </div>
                        </form>

                        <form
                            action=""
                            className="sign-up-form formulario__login"
                            method=""
                            encType=""
                        ></form>

                        <form
                            action=""
                            className="sign-up-form formulario__login"
                            method=""
                            enctype="multipart/form-data"
                            onSubmit={Sign_up}
                        >
                            <h2 className="title">Registrarse</h2>

                            <div className="foto">
                                <input
                                    type="file"
                                    encType="multipart/form-data"
                                    name="img"
                                    aria-label="Archivo"
                                    className='input-file-doc'
                                />}


                                { /* <img
                                    className="preliminar"
                                    src={Usuario}
                                    id="file"
                                    alt=""
                                /> */}
                                <p className='pinput' >FOTO</p>

                            </div>

                            <div className="content-input">

                                <div className="container-inputs">
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area1" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="nombre"
                                            className="nombre"
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area2" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="apellidos"
                                            type="text"
                                            placeholder="Apellidos"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area3" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area4" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="password"
                                            type="text"
                                            placeholder="Contraseña"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area5" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="telefono"
                                            type="text"
                                            placeholder="Teléfono"
                                            required
                                        />
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area6" }}
                                    >
                                        <i className="fas fa-lock"></i>
                                        <input
                                            name="dirección"
                                            type="text"
                                            placeholder="Dirección"
                                        />
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area7" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <select name="tipo_de_artista" id="type_of_artist">
                                            <option value="Artista" disabled selected>Artista</option>
                                            <option value="dibujante">dibujante</option>
                                            <option value="fotografo">fotografo</option>
                                        </select>
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area8" }}
                                    >
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            name="tipo_de_arte"
                                            type="text"
                                            placeholder="Tipo de arte"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field-tx input-field-textarea"
                                        style={{ gridArea: "area9" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <textarea id="descripción" name="descripción" rows="4" cols="50" placeholder="Descripción" required></textarea>
                                    </div>
                                </div>

                                <div className="btn-register">
                                    <input
                                        type=""
                                        className="btn"
                                        value="Iniciar Sesión"
                                        onClick={Sing_up_btn}
                                    />

                                    <input
                                        type="submit"
                                        className="btn"
                                        value="Registrarse"
                                    />

                                </div>
                            </div>
                            <div className="social-media"></div>
                        </form>
                    </div>
                    <img
                        src="img/fondo.svg"
                        className={
                            sign ? "image fondo-img-none" : "image fondo-img"
                        }
                        alt=""
                    />
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <img
                                src={LogoVm}
                                className="LogoPreliminar"
                                alt="logoMajica"
                            />
                            <div className="text-panel">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Neque, accusamus animi
                                    distinctio blanditiis dignissimos doloremque
                                    corrupti ad. Sed, porro accusamus incidunt
                                    odio provident quod rem beatae nobis, quam,
                                    nulla perferendis?
                                </p>
                                <a href="https://www.majica.es/programacion
                            ">
                                    <button
                                        className="btn transparent"
                                        id="sign-up-btn"
                                        onClick=""
                                    >
                                        Saber mas
                                    </button>
                                </a>
                            </div>

                            {/* <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Regístrate para que puedas iniciar sesión
                </p>  */}
                            {/* <button className="btn transparent" id="sign-up-btn" onClick={Sign_in_btn}>
                  Registrate
                </button> */}
                        </div>
                        {/* <img src={Logo} className="image" alt="" /> */}
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <img src={LogoVm} className="image-second" alt="Majica" />
                        </div>
                        {/* <img src={Logo} className="image" alt="" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
