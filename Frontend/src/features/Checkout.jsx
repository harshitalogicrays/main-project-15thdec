import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
const stripePromise = loadStripe("pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw");

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://server-15th.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount:2000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container col-8 mt-5 p-3 shadow">
      <div className="row">
        <div className="col"><CheckoutSummary/></div>
        <div className="col">
          <h1>Stripe Payment Checkout</h1><hr/>
          {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
        </div>
      </div>
      
    </div>
  );
}

export default Checkout
