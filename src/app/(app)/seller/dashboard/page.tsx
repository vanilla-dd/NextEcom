import { auth } from "@/auth";
import ConnectStripe from "@/components/connect/ConnectStripe";
import ShowProducts from "@/components/connect/product/ShowProducts";
import { fetchConnectedAccountProducts } from "@/server/actions/stripe/getStripeAccProducts";
import { linkAccount } from "@/server/actions/stripe/linkAccount";
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
    <div className="flex flex-col gap-4">
      <ConnectStripe />
      <ShowProducts products={products} />
    </div>
  );
}

export default page;
