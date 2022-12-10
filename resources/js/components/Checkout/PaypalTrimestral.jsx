import React from 'react'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const PaypalTrimestral = () => {

    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);

    if (paid) {
        alert("Gracias por su suscripcion")
    }

    if (error) {
        alert(error)
    }

    const ButtonWrapper = ({ type }) => {
        const [{ options }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    intent: "subscription",
                },
            });
        }, [type]);

        return (
            <PayPalButtons
                createSubscription={ async (data, actions) => {
                    return await actions.subscription
                        .create({
                            plan_id: "P-1DB085477F127313PMN6KG5A",
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}

                onApprove= { async (data, actions) => {
                    alert(`Se ha registrado bajo el codigo de suscripcion ${data.orderID}`)
                    setPaid(true);
                }}

                onError={(error) => {
                    setError(error);
                    console.error(error)
                }}

                onCancel={() => {
                    alert('Ha cancelado continuar con el proceso de suscripcion')
                }}

                style={{
                    label: "subscribe",
                }}
            />);
    }

    return (
        <div className='container_paypal'>
            <div className='sub-container-paypal'>
                <PayPalScriptProvider
                    options={{
                        "client-id": "AQy1c_FMYLca9qzw3wu7taJTS2YoQadl1Z8lml0kQdK7oKIfeJKzWA1nmZB2WIiF3is9__6Iv_hqNITo",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                    }}>
                    <ButtonWrapper type="subscription" />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default PaypalTrimestral