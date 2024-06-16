"use server";

import { accountLink } from "@/lib/helpers";
import Link from "next/link";
import React from "react";

export default async function ConnectStripe() {
  const url = accountLink();
  return <Link href={url}>Connect Your Stripe</Link>;
}
