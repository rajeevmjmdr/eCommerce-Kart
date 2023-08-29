import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../features/payment/CheckoutForm";
import "../features/payment/StripeCheckout.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NjOBiSC1VYVooY7NBlzwbsNKOtfKMtd5f6tFUUV89dZIJdnASrcVEO9mDwBC8cSnRrqa0TX5sAsJyJal8deRoGK00z92yhib8");

export default function StripeCheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId:currentOrder.id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentOrder.totalAmount,currentOrder.id ]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe flex place-content-center my-10 ">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}