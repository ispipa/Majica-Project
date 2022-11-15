//IMPORTACION DE Y ASIGNACION DE VARIABLES
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

//INSTANCIA DE EXPRESS()
const app = express();

//CLAVE PRIVADA QUE SE USA EN EL FRONTEND, HAY QUE PASARLA COMO VARIABLE DE ENTORNO
const stripe = new Stripe("sk_test_51M1o9GIDq5OU7SfM505gkgVXsaWsHQ1R3d18QhmcVAd7gJEuK9uHqbhSOUaTlQmaSbBo0YtJKF1G0AajmA91EhlZ00hx5Hopg5");

//IMPORTANTE, MODIFICAR RUTA DE ORIGEN EN CORS
app.use(cors({ origin: '*' }));

//FORMATO JSON AL REQ.BODY
app.use(express.json());

const PORT = 8001;

//CREACION DEL SERVIDOR Y LECTURA DEL FRONT
app.post('/api/checkoutStripe', async (req, res) => {

    try {
        const { id, amount } = req.body;

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "EUR",
            description: "Venta de Sala (id)", // DESCRIPCION DEBE SER HALADA DE LA BASE DE DATOS
            payment_method: id,
            confirm: true
        });
        console.log(payment);
        res.send(payment);
        res.send({ message: "Succesfull Payment" });
    } catch (error) {
        console.log(error);
        res.json({ message: error.raw.message })
    }
})

//ASIGNACION DE PUERTO, AUN FALTA ASIGNARLE LA VARIABLE DEL PUERTO QUE MANEJARA CUANDO SE ENCUENTRE EN PRODUCCION
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})

// 4242 4242 4242 4242