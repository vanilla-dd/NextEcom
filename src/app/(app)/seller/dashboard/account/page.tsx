"use server";

import { auth } from "@/auth";
import ConnectStripe from "@/components/connect/ConnectStripe";
import { ContentLayout } from "@/components/dashboard/content-layout";
import React from "react";

async function page() {
  const user = await auth();

  return (
    <ContentLayout title={"Account"}>
      <ConnectStripe />
    </ContentLayout>
  );
}

export default page;
