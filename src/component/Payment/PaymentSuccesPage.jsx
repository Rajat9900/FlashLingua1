// PaymentSuccesPage.js
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const PaymentSuccesPage = ({ userId, email }) => {

    useEffect(()=>{
        const stripe = new Stripe('sk_test_51NTZLiD15EFB6mA7OdDSLaVcS52FR619qbOdMF8X5QEDmBmr03kqLkdICtR9Kre5wmyXv4laGkoESdW8xmMc69SV00OC5kE8s4');
    },[]);

 
  return (
     <div className="flex justify-center ">
    <div className="flex flex-col items-center w-[70%]">
    <h2 className="p-3">Thank You</h2>
        <p className="p-3">No you can access 25 more cards.</p>
      </div>
      </div>
  );
};

export default PaymentSuccesPage;
