import React, { useState } from 'react';
import Usuario from '../assets/usu2.jpg';
import Logo from '../assets/Logo.png'
// import LogoMJ from '../assets/LogoMj.png'
import LogoMJ from '../assets/LogoMJ.png'
import LogoVm from '../assets/Nueva carpeta - copia/LogoVm.png'
import axios from "axios";


export const ResetPass = () => {

    const [sign, setSign] = useState(false);
    const forgotPass= (e) => {
        e.preventDefault();
        let correoUser = e.target.correo.value;
        axios.post(`http://127.0.0.1:8000/api/reset-password`,
            {
                email: correoUser
            }
        ).then(res => {
            console.log(res);
            console.log(res.data);
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
                            onSubmit={forgotPass}
                        >
                            {/* <img src={LogoMJ} className="image" alt="Majica" /> */}
                            <h2 className="title">Escribe tu nueva contraseña</h2>
                            <div className="content-input">
                                <div className="input-field">
                                    {/* <i className="fas fa-user"></i> */}
                                    <input
                                        name="newPass"
                                        type="password"
                                        placeholder="Nueva Contraseña"
                                        required

                                    />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i> 
                                    <input
                                        name="confPass"
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                    />
                                </div>
                                <div className="btn-register">
                                    {/* <input
                                        type=""
                                        value="Crear Cuenta"
                                        className="btn solid"
                                        onClick={Sign_in_btn}
                                        preventDefault=""
                                    /> */}

                                    <input
                                        type="submit"
                                        value="Enviar"
                                        className="btn solid"
                                        
                                    />

                                </div>
                            </div>
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
                        </div>
                    <div className="panel right-panel">
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}