// PaymentSuccessPage.js
import React, { useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import '../css/Payment.css'; // Import CSS for payment pages
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const PaymentSuccessPage = ({ userId, email }) => {

    useEffect(()=>{
        const stripe = new Stripe('sk_test_51NTZLiD15EFB6mA7OdDSLaVcS52FR619qbOdMF8X5QEDmBmr03kqLkdICtR9Kre5wmyXv4laGkoESdW8xmMc69SV00OC5kE8s4');

        const getCustomerId = async () =>{
            const customers = await stripe.customers.list({
            email : email,
            });
        
            try{
            const customerId = customers.data[0];
            const customerData = customers;
        
            console.log('Customer id:', customers);
        
            var id= await customers.data[0].id;
            const subscriptions= await stripe.subscriptions.list({
                customer:id,
            });
            console.log('subscription Data: ', subscriptions.data);
            const subscriptionsData=subscriptions.data;
            
           
                const response = await fetch('http://localhost:5000/transactions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userId, email,customerId,subscriptionsData }),
                });
                if (response.ok) {
                  const data = await response.json();
                  console.log('Transaction stored:', data);
                } else {
                  console.error('Error storing transaction');
                }
              } catch (error) {
                console.error(error);
              }
        }

        getCustomerId();
    },[]);

 
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="payment-page-container success-page"> {/* Apply new CSS class */}
        <div className="icon-container">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
          >
            <path
              fill="#28a745"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 7l-8 8-4-4 1.41-1.41L9 14.17l6.59-6.59L17 9z"
            />
          </svg>
        </div>
        <h2>Payment Successful</h2>
        <p>Thank you for your payment!</p>
        {/* Additional content or actions can be added here */}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
