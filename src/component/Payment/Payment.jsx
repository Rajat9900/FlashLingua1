import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { createPaymentIntent } from "../../../services";


const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");



  useEffect(() => {
  const getAPiToken = localStorage.getItem("token");

      setStripePromise(loadStripe('pk_test_51NTZLiD15EFB6mA7n0mvTp1NBtzW3G8swrNtBBreXeid2ez2QmTvJtPIUL6iGoGMEbpe0LibYQxjuYHeuG8lzbIY00Tht4QFGt'));
  
     createPaymentIntent(getAPiToken).then(res => {
      setClientSecret(res.data.client_secret);

    }).catch(err => {
      console.error("Error fetching data:", err);
    });

    const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };



  }, []);

  return (
    <>
    <div className="flex justify-center ">
    <div className="flex flex-col items-center w-[70%]">
    <h2 className="p-3">Flash Card Payment</h2>
        <p className="p-3">This payment is for a $10 to access next 25 cards. After purchasing this option, you can access 25 more cards.</p>

      {/* <h1>React Stripe and the Payment Element</h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentElement />
        <button className="bg-[#4CAF50] w-[30%] p-2 rounded-xl text-white mt-5">Submit</button>
        </Elements>
      )}
      </div>
      </div>
    </>
  );
};
export default Payment;
