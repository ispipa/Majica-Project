import React, { useState, useEffect } from 'react'
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import '../../../css/paypalcheckout.css'
import toast, { Toaster } from 'react-hot-toast';

const PaypalMensual = ({data}) => {

	const [paid, setPaid] = useState(false);

	const handleApprove = (orderId) => {
		data.forEach(element => {
			axios.put("http://localhost:8000/api/pago/" + element.sala_pagos+"?pagoo=pagoTrue", {
			'pagado': 'true'
			});
			// console.log("http://localhost:8000/api/pago/" + element.id+"?pago=pagoTrue")
		});
		setPaid(true)
	}


	const ButtonWrapper = ({ type }) => {
		const [{ options }, dispatch] = usePayPalScriptReducer();

		useEffect(() => {
			prueba();
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
			// onClick={(data, actions) => {

			// 	const yaSuscrito = false

			// 	if (yaSuscrito) {
			// 		setError("Ya ha solicitado una suscripcion con esta cuenta")
			// 		return actions.reject()
			// 	} else {
			// 		return actions.resolve()
			// 	};
			// }}
			createSubscription={async (data, actions) => {
				return await actions.subscription
					.create({
						plan_id: 'P-25T12664XG228441XMOKGNZI',
					})
					.then((orderId) => {
						// Your code here after create the order
						return orderId;
					});
			}}

			onApprove={(data, actions) => {
				handleApprove(data.orderID);
				
				toast.success(`Se ha registrado su suscripcion, GRACIAS ARTISTA!`)
			}}

			onError={(error) => {
				// toast.error("A ocurrido un error");
				console.log(error)
			}}

			onCancel={() => {
				toast.error("Ha cancelado el proceso de suscripcion");
			}}

			style={{
				label: "subscribe",
			}}
		/>);
	}

	const prueba = ()=>{
		console.log(data);
        
    
			
			
     
		
	}

	return (
		<div className='container_paypal'>
			<div className='sub-container-paypal'>
				<Toaster 
					position='bottom-left' />
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

export default PaypalMensual

