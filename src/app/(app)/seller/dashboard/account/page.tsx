"use server";

import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import { ContentLayout } from "@/components/dashboard/content-layout";
import React from "react";

async function page() {
  const user = await auth();
  console.log(user);
  return (
    <ContentLayout title={"Account"}>
      <div>hfsdf</div>
      <SignOut />
    </ContentLayout>
  );
}

export default page;
