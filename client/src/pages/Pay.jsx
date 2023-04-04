import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../utils/newRequest"
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm"


//publishable key not secret
const stripePromise = loadStripe(
    "pk_test_51MqD0eDnDvGJKXZ6fKvEpYSkJ1N6qp8GPLMfuC40h2pADM5AHi6jJGtJRg7pWCJyepCTWZMhBdKrtN1gwgKJux8l00hb8SSee8"
  );

const Pay = () => {

const [clientSecret, setClientSecret] = useState("");

const { id } = useParams();


useEffect(() => {
  const makeRequest = async () => {
    try {
      const res = await newRequest.post(
        `/orders/create-payment-intent/${id}`
      );
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };
  makeRequest();
}, []);

const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay