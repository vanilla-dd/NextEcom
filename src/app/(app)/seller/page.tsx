import { auth } from "@/auth";
import { getIsSeller } from "@/server/actions/isSeller";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session) redirect("/signup");
  const isSeller = await getIsSeller();
  if (isSeller) redirect("/seller/dashboard");
  return <div></div>;
}

export default page;
