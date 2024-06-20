import { auth } from "@/auth";
import ShowCreateForm from "@/components/ShowCreateProduct";
import { ContentLayout } from "@/components/dashboard/content-layout";
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

  return (
    <ContentLayout title={"Dashboard"}>
      <ShowCreateForm />
    </ContentLayout>
  );
}

export default page;
