// PaymentCancelPage.js
import React from 'react';
import DashboardHeader from './DashboardHeader';
import '../css/Payment.css'; // Import CSS for payment pages

const PaymentCancelPage = ({ userId, email }) => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="payment-page-container cancel-page"> {/* Apply new CSS class */}
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
            />
          </svg>
        </div>
        <h2>Payment Canceled</h2>
        <p>Your payment has been canceled.</p>
        {/* Additional content or actions can be added here */}
      </div>
    </div>
  );
};

export default PaymentCancelPage;
