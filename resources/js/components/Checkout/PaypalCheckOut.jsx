import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckout = () => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AVLoSjSWLaZZpV5aUSXmpFd1bwcfcEaP3anxopAk96aR9_79t96p76XquTgSgdclcTziyyKFCayb__yC" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalCheckout