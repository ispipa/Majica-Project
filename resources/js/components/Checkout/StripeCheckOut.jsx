import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Axios from 'axios'
import '../../../css/checkout.css'


const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitStripe = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;

            try {
                const { data } = await Axios.post(
                    "http://127.0.0.1:8001/api/checkoutStripe",
                    {
                        id,
                    }
                );
                console.log(data);
                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmitSubMonth = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (result.error) {

            console.log(result.error.message);

        } else {

            const res = await axios.post('http://127.0.0.1:8002/api/monthlySubscription', { "payment_method": result.paymentMethod.id });

            console.log(res.data);

            // const { client_secret, status } = payment_intent;

            if ('status' === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then((result) => {
                    if (result.error) {
                        console.log("OH OH PROBLEMS: ");
                        console.log(result.error);
                    } else {
                        //Success Message
                        console.log("Payed");
                    }
                });
            } else {
                console.log("Payed");
            }
        };
    }

    const handleSubmitSubTriMonth = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (result.error) {

            console.log(result.error.message);

        } else {

            const res = await axios.post('http://127.0.0.1:8002/api/triMonthSubscription', { "payment_method": result.paymentMethod.id });

            console.log(res.data);

            // const { client_secret, status } = payment_intent;

            if ('status' === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then((result) => {
                    if (result.error) {
                        console.log("OH OH PROBLEMS: ");
                        console.log(result.error);
                    } else {
                        //Success Message
                        console.log("Payed");
                    }
                });
            } else {
                console.log("Payed");
            }
        };
    }

    return (
        <>
            {/* <form className="form" onSubmit={handleSubmitStripe}>

                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pagar una vez
                </button>
            </form> */}
            {/* <form className="form" onSubmit={handleSubmitSubMonth}>
                <CardElement />
                <button type="submit">
                    Suscripcion
                </button>
            </form> */}
            {/* <form className="form" onSubmit={handleSubmitSubTriMonth}>
                <CardElement/>
                <button type="submit">
                    Suscripcion 3 Meses
                </button>
            </form> */}
            <form action="/create-checkout-session.php" method="POST">
                <input type="hidden" name="priceId" value="price_1M56JoIDq5OU7SfMNjdVw7AN" />
                <button type="submit">Checkout</button>
            </form>
        </>
    );
};

export default CheckOutForm;
