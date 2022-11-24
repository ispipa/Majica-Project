import React from 'react'
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const PaypalMensual = () => {

  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaid(true)
    console.log(paid);
  }

  if(paid){
    alert("Gracias por su suscripcion")
  }

  if(error){
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

    return (<PayPalButtons
      onClick={(data, actions) => {

        const yaSuscrito = false

        if(yaSuscrito){
          setError("Ya ha solicitado una suscripcion con esta cuenta")
          return actions.reject()
        } else {
          return actions.resolve()
        };

      }}
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-9K913015YJ498554WMN6I5XA",
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove = { async (data, actions) => {
        // const success = await actions.subscription.capture();
        alert(`Se ha registrado bajo el codigo de suscripcion ${data.orderID}`)
        handleApprove(data.orderID)
      }}
      onError = {(error) => {
        setError(error);
        console.error(error)
      }}
      onCancel = {() => {
        alert('Ha cancelado continuar con el proceso de suscripcion')
      }}
      style={{
        label: "subscribe",
      }}
    />);
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AXcG6OB3Ow9GMsbXF53vLEIrmiPFFW_vVkeuLpb4_kQZBf2p6TCS69_s8eNy5FAcC9kju1l2giHD9OcB",
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}>
      <ButtonWrapper type="subscription" />
    </PayPalScriptProvider>
  );
}

export default PaypalMensual