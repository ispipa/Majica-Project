//DEFINICION DE VARIABLES

const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

/* 
1.SE CREA UNA APP EN PAYPAL 
2.AGREGAMOS LAS CREDENCIALES OTORGADAS POR PAYPAL (ID, SECRET);
3.PAGINA WEB PARA CREACION DE LA API (https://developer.paypal.com/)
4.IMPORTANTE HACER SWITCH EN PAYPAL_API AL MOMENTO DE LLEVAR LA APP A PRODUCCION (SANDBOX PARA TESTING Y LIVE PARA USO COMERCIAL)
*/

const CLIENT = 'AVLoSjSWLaZZpV5aUSXmpFd1bwcfcEaP3anxopAk96aR9_79t96p76XquTgSgdclcTziyyKFCayb__yC';
const SECRET = 'EJBhVoz5D9d8upn4pXQJeg0ofwuzcHIu7WWKgB-_irbOMgRfQJRUVvmPN9a3tmTI-KrCb8RhTgMDlril';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const auth = { user: CLIENT, pass: SECRET };

//CONTROLADORES

const createPayment = (req, res) => {
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR', //https://developer.paypal.com/reference/currency-codes/
                value: '60' // VALOR DEL PRODUCTO A VENDER, DADO POR EL ADMINISTRADOR DEL SISTEMA
            }
        }],
        application_context: {
            brand_name: 'Virtual_Museum', //NOMBRE DE TU EMPRESA
            landing_page: 'NO_PREFERENCE', //DEFAULT
            user_action: 'PAY_NOW', //BOTON DE ACCION
            return_url: 'http://localhost:3002/execute-payment', //URL DESPUES DE REALIZAR EL PAGO
            cancel_url: 'http://localhost:3002/cancel-payment' //URL EN CASO DE QUE EL USUARIO CANCELE EL PAGO
        }
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        try {
            res.json({ data: response.body })
        } catch {
            console.log(err);
            throw err
        };
    })
};

const executePayment = (req, res) => {
    const token = req.query.token; // TOKEN AUTH PARA CAPTURAR LA TRANSACCION

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        try{
            res.json({data: response.body})
        } catch {
            console.log(err)
            throw err
        };
    });
};

app.post('/create-payment', createPayment);
app.get('/execute-payment', executePayment);

app.listen(3002, () => {
    console.log("Escuchando en http://localhost:3002");
})