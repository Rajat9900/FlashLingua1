import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { savePayment } from "../../../services";

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { createPaymentIntent } from "../../../services";


const Payment = () => {
   const navigate  = useNavigate()
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();





  useEffect(() => {
  const getAPiToken = localStorage.getItem("token");

  let params = searchParams.get("redirect_status");

    if(params && params == 'succeeded'){

      let payent_intent = searchParams.get("payment_intent");
       const formData = new FormData()
      formData.append('payent_intent',payent_intent)


       savePayment(getAPiToken,{payent_intent}).then(res => {
          alert('You Payment has been received. Now you can access more cards!');
      //navigate('/')
      }).catch(err => {
        console.log(err)
       // alert('Please do another payment to access more cards!');
        navigate('/')
      });

    }else{
      setStripePromise(loadStripe('pk_test_8aNH9uOjNiKBIYbS8oJe9WWu'));
  
       createPaymentIntent(getAPiToken).then(res => {
        setClientSecret(res.data.client_secret);

      }).catch(err => {
        console.error("Error fetching data:", err);
      });

    }



      
    
    console.log('shivi')
    console.log(params)

  

  }, []);


  return (
    <>
    <div className="flex justify-center"> 
      <div className="flex  flex-col gap-4 w-[39%] justify-center items-center h-[100vh]">
     <p className="text-[#4CAF50]">You made in through 25 words!!</p>
     <p className="">Enjoying the content? For the price of a latte,you can access even more cards! the teachers who create these cards receive 80% of the revenue.</p>
     <p>Support them to keep producing amazing material.</p>
    
     <p>We use Stripe, o it is super easy!</p>

     {/* <h1>React Stripe and the Payment Element</h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </div>
    </>
  );
};
export default Payment;
