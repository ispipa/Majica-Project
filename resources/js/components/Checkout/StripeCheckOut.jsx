import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
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
                        amount: 6000,
                    }
                );
                console.log(data);
                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form className="form" onSubmit={handleSubmitStripe}>
            <CardElement />
            {/* <h3>{amount}</h3> */}
            <button type="submit" disabled={!stripe}>
                Pagar
            </button>
        </form>
    );
};

export default CheckOutForm;
