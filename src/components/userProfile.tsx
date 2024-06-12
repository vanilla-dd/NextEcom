import Image from "next/image";
import { auth } from "../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
        width={100}
        height={100}
        src={session.user.image ?? ""}
        alt="User Avatar"
      />
    </div>
  );
}
