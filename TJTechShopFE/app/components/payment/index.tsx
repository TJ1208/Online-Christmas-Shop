"use client"

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { CartProductModel } from '@/app/models/cart_product';

const stripePromise = loadStripe("pk_test_51LkwQ6AvRlTvliZhIprOBnCe3xKCsmogPJishhKaaiDWMCGS3O7CNKuEdIYWnfJnhoCh1szHns1L4pAFULSoRByp00nXdd2lea");

export default function CheckoutForm(cartItems: CartProductModel[]) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify(cartItems)
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout" className="p-5 border rounded-lg bg-white">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}