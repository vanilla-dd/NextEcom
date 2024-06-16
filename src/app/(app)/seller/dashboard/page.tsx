import { auth } from "@/auth";
import ShowProducts from "@/components/connect/ShowProducts";
import ConnectStripe from "@/components/nav/ConnectStripe";
import {
  fetchConnectedAccountProducts,
  linkAccount,
} from "@/server/actions/getStripeAccProducts";
import { redirect } from "next/navigation";
import React from "react";

async function page({ searchParams }: { searchParams: { code?: string } }) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/signup");
  }

  if (searchParams.code) {
    await linkAccount(searchParams.code);
    redirect("/seller/dashboard");
  }

  const products = await fetchConnectedAccountProducts();

  return (
    <div>
      <ConnectStripe />
      <ShowProducts products={products} />
    </div>
  );
}

export default page;
