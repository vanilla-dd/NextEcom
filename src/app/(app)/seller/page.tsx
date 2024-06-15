import { auth } from "@/auth";
import { SellForm } from "@/components/forms/sell";
import { getIsSeller } from "@/server/actions/isSeller";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) redirect("/signup");
  const isSeller = await getIsSeller();
  console.log(isSeller, session);
  if (isSeller) redirect("/seller/dashboard");
  return (
    <div>
      <SellForm />
    </div>
  );
}

export default page;
