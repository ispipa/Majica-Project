//DEFINICION DE VARIABLES
const express = require('express');
const cors = require('cors');
const { urlencoded } = require('express');
const env = require('dotenv').config({ path: '../../../../.env' })
const axios = require('axios')
const request = require('request');

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

/* 
1.SE CREA UNA APP EN PAYPAL 
2.AGREGAMOS LAS CREDENCIALES OTORGADAS POR PAYPAL (ID, SECRET);
3.PAGINA WEB PARA CREACION DE LA API (https://developer.paypal.com/)
4.IMPORTANTE HACER SWITCH EN PAYPAL_API AL MOMENTO DE LLEVAR LA APP A PRODUCCION (SANDBOX PARA TESTING Y LIVE PARA USO COMERCIAL)
*/

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const auth = { username: process.env.PAYPAL_CLIENT, password: process.env.PAYPAL_SECRET };
const header = { 'Content-Type': 'application/x-www-form-urlencoded' };

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

app.post('/create-payment', createPayment);
app.get('/execute-payment', executePayment);

//Suscripcion----------------------------------------------------------
/* 
1. Se crea el producto al cual se le apegara un plan de pago.
2. Se crea el plan de pago, uniendo el id del producto.
3. Se crea la subscripcion
*/

const createProduct = async (req, res) => {

    try {
        const product = {
            name: 'Suscripcion VirtualMuseo',
            description: 'Suscripcion a un espacio virtual donde se muestra el arte del artista',
            type: 'SERVICE',
            category: 'ARTS_AND_CRAFTS',
            image_url: 'https://postimg.cc/CzWy92Rm'
        }

        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials")

        const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: process.env.PAYPAL_CLIENT,
                password: process.env.PAYPAL_SECRET
            },
        })

        const response = await axios.post(`${PAYPAL_API}/v1/catalogs/products`, product, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        // const product_id = response.data.id
        res.json(response.data)
    } catch (error) {
        return res.status(500).send("Ha ocurrido un error, intente de nuevo")
    }
}

const createPlan = async (req, res) => {
    const { body } = req

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials")

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
    })

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
                total_cycles: 0,
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

    const response = await axios.post(`${PAYPAL_API}/v1/billing/plans`, plan, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.json(response.data)
}

const createPlanTriMonth = async (req, res) => {
    const { body } = req

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials")

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
    })

    const planTriMonth = {
        name: 'Plan Trimestral',
        product_id: body.product_id,
        status: 'ACTIVE',
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 3
                },
                tenure_type: 'REGULAR',
                sequence: 1,
                total_cycles: 0,
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

    const response = await axios.post(`${PAYPAL_API}/v1/billing/plans`, planTriMonth, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.json(response.data)
}

const generateSubscription = async (req, res) => {
    const { body } = req

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials")

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
    })

    const subscription = {
        plan_id: body.plan_id,
        start_time: "2022-12-01T00:00:00Z",
        quantity: 1,
        subscriber: {
            name: {
                given_name: "Wolf",
                surname: "Nylander"
            },
            email_address: "wolfnylander@gmail.com"
        }
    }

    const response = await axios.post(`${PAYPAL_API}/v1/billing/subscriptions`, subscription, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.json(response.data)
}

const captureSubscription = async (req, res) => {

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials")

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
    })

    const capture = {
        note: "Charging as the balance reached the limit",
        capture_type: "OUTSTANDING_BALANCE",
        amount: {
            currency_code: "EUR",
            value: '10',
        }
    }

    const response = await axios.post(`${PAYPAL_API}/v1/billing/subscriptions/I-HNWWJTW86MMF/capture`, capture, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.json(response.data)    
}

app.get('/create-product/', createProduct);
app.post('/create-product', createProduct);

app.post('/create-plan', createPlan);
app.get('/create-plan/', createPlan);

app.post('/create-plan-trimonth', createPlanTriMonth);
app.post('/generate-subscription', generateSubscription);
app.post('/capture-subscription', captureSubscription);

app.listen(3002, () => {
    console.log("Escuchando en http://localhost:3002");
})