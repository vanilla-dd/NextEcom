import { SignIn } from "@/components/auth/signin-button";
import UserAvatar from "@/components/userProfile";

export default function Home() {
  return (
    <>
      <main>
        <UserAvatar />
      </main>
      <SignIn />
    </>
  );
}
