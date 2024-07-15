import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/SubscriptionForm.css';
import DashboardHeader from './DashboardHeader';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const SubscriptionForm = ({ userId, email }) => {
  // const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const stripe = new Stripe('sk_test_51NTZLiD15EFB6mA7OdDSLaVcS52FR619qbOdMF8X5QEDmBmr03kqLkdICtR9Kre5wmyXv4laGkoESdW8xmMc69SV00OC5kE8s4');

  const showToast = (message, type) => {
    toast(message, {
      type: type,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubscription = async () => {
    setLoading(true);

    try {
      const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));

      if (error) {
        console.error('Error creating token:', error.message);
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Token created successfully
        console.log(token);

        const response = await fetch('http://localhost:5000/createSubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stripeToken: token.id, userId }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success('Subscription created successfully', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('Error creating subscription', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error('Error creating subscription:', result.error);
        }
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error('Error creating subscription', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setLoading(false);
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe("pk_test_51NTZLiD15EFB6mA7n0mvTp1NBtzW3G8swrNtBBreXeid2ez2QmTvJtPIUL6iGoGMEbpe0LibYQxjuYHeuG8lzbIY00Tht4QFGt");
    
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{price: 'price_1OiuTQD15EFB6mA7sZIEimjH', quantity: 1 }], 
      mode: 'subscription', 
      customerEmail: "deepak@gmail.com",
      successUrl: `http://localhost:3000/dashboard/payment-success`, 
      cancelUrl: `http://localhost:3000/dashboard/payment-cancel`,
    });
  
    if (error) {
      console.warn('Error:', error);
    }
  }

  const getCustomerId = async () =>{
    const customers = await stripe.customers.list({
      email : 'deepak@gmail.com',
    });

    try{
      const customerId = customers.data[0].id;
      const customerData = customers;

      console.log('Customer id:', customers);

      var id= await customers.data[0].id;
      const subscriptions= await stripe.subscriptions.list({
        customer:id,
      });

      console.log('subscription Data: ', subscriptions.data);

      
    }
    catch(error){
      console.log(error);
    }
  }
  
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="payment-container">
        <h2>Flash Card Payment</h2>
        <p>This payment is for a $10 one-year subscription. After purchasing this subscription, you can access all the cards.</p>

        <div className="card-element-container">
          {/* <input
        placeholder="Price Id"
        type="text"
        
      /> */}
      <input
        placeholder="Name"
        type="text"
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        
      />
          <CardElement
            className="custom-form-card"
            options={{
              disableLink: true,
              iconStyle: 'solid',
              hidePostalCode : true,
              style: {
                base: {
                  backgroundColor: '#fafafa',
                  fontSize: '16px',
                  lineHeight: '40px',
                  border: '2px solid black',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />

        </div>

        {/* <button onClick={handleSubscription} disabled={loading}>
          {loading ? 'Processing...' : 'Subscribe'}
        </button> */}
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Subscribe'}
        </button>

      </div>
    </div>
  );
};

export default SubscriptionForm;
