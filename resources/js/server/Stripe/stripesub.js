const express = require('express');
const app = express();
const cors = require('cors');
const { urlencoded } = require('express');
const env = require('dotenv').config({path: "../../../../.env"});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
const port = 8002;

app.post('/api/monthlySubscription', async(req, res) => {

    const {payment_method} = req.body

    const customer = await stripe.customers.create({
        payment_method: payment_method,
        invoice_settings: {
            default_payment_method: payment_method,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{plan: "price_1M56JoIDq5OU7SfMNjdVw7AN"}],
        expand: ['latest_invoice.payment_intent']
    });

    const status = subscription['latest_invoice']['payment_intent']['status']
    const client_secret = subscription['latest_invoice']['payment_intent']['client-secret']

    console.log(subscription.payment_intent);
    res.json({'client_secret': client_secret, 'status': status});
})

app.post('/api/triMonthSubscription', async(req, res) => {

    const {payment_method} = req.body

    const customer = await stripe.customers.create({
        payment_method: payment_method,
        invoice_settings: {
            default_payment_method: payment_method,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{plan: "price_1M56JoIDq5OU7SfMWq2knIyB"}],
        expand: ['latest_invoice.payment_intent']
    });

    const status = subscription['latest_invoice']['payment_intent']['status']
    const client_secret = subscription['latest_invoice']['payment_intent']['client-secret']

    res.json({'client_secret': client_secret, 'status': status});
})

app.post('v1/checkout/sessions', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://127.0.0.1:8000/success',
        cancel_url: 'https://example.com/cancel',
        line_items: [
          {price: 'price_1M56JoIDq5OU7SfMNjdVw7AN', quantity: 1},
        ],
        mode: 'subscription',
      });

      res.json(session);
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
});