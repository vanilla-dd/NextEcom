import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();
  return <div>{session?.user?.id ?? "fsdfsdf"}</div>;
}
