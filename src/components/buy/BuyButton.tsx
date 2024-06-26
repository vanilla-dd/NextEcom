"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { createCheckoutSession } from "@/server/actions/stripe/createCheckoutSession";
import { redirect } from "next/navigation";

interface CheckoutSessionParams {
  currency: string;
  connectedId: string;
  priceId: string;
  price: number;
  productNamedUrl: string;
}

function BuyButton({
  children,
  checkoutSessionParams,
}: {
  children: React.ReactNode;
  checkoutSessionParams: CheckoutSessionParams;
}) {
  return (
    <Button
      onClick={async () => {
        const url = await createCheckoutSession({
          currency: checkoutSessionParams.currency,
          connectedId: checkoutSessionParams.connectedId,
          priceId: checkoutSessionParams.priceId,
          price: checkoutSessionParams.price,
          productNamedUrl: checkoutSessionParams.productNamedUrl,
        });
        url && (window.location.href = url);
      }}
    >
      {children}
    </Button>
  );
}

export default BuyButton;
