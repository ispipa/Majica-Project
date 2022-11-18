//DEFINICION DE VARIABLES
const express = require('express');
const cors = require('cors');
const request = require('request');
const env = require('dotenv').config({path:'../../../../.env'})

const app = express();
app.use(cors());
app.use(express.json());

/* 
1.SE CREA UNA APP EN PAYPAL 
2.AGREGAMOS LAS CREDENCIALES OTORGADAS POR PAYPAL (ID, SECRET);
3.PAGINA WEB PARA CREACION DE LA API (https://developer.paypal.com/)
4.IMPORTANTE HACER SWITCH EN PAYPAL_API AL MOMENTO DE LLEVAR LA APP A PRODUCCION (SANDBOX PARA TESTING Y LIVE PARA USO COMERCIAL)
*/

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const auth = { user: process.env.PAYPAL_CLIENT, pass: process.env.PAYPAL_SECRET};

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
        try {
            res.json({ data: response.body })
        } catch {
            console.log(err)
            throw err
        };
    });
};

//Subscripcion----------------------------------------------------------
/* 
1. Se crea el producto al cual se le apegara un plan de pago.
2. Se crea el plan de pago, uniendo el id del producto.
3. Se
*/

const createProduct = (req, res) => {
    const product = {
        name: 'Subscripcion VirtualMuseo',
        description: 'Subscripcion a un espacio virtual donde se muestra el arte del artista',
        type: 'SERVICE',
        category: 'ARTS_AND_CRAFTS',
        image_url: 'https://postimg.cc/CzWy92Rm'
    }
    request.post(`${PAYPAL_API}/v1/catalogs/products`, {
        auth,
        body: product,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const createPlan = (req, res) => {
    const { body } = req
    console.log(req)

    const plan = {
        name: 'Plan Mensual',
        product_id: body.product_id,
        status: 'ACTIVE',
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1
                },
                tenure_type: 'REGULAR',
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: '10', //Costo mensual del producto
                        currency_code: 'EUR'
                    }
                }
            }],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
                value: '10', // Monto inicial a pagar para comprar el producto
                currency_code: 'EUR'
            },
            setup_fee_failure_action: 'CANCEL',
            payment_failure_threshold: 3,
        },
        taxes: {
            percentage: '10', //Porcentage añadido de impuestos
            inclusive: true
        }
    }

    request.post(`${PAYPAL_API}/v1/billings/plans`, {
        auth,
        body: plan,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

app.post('/create-payment', createPayment);
app.get('/execute-payment', executePayment);

app.post('/create-product', createProduct);
app.post('/create-plan', createPlan);

app.listen(3002, () => {
    console.log("Escuchando en http://localhost:3002");
})