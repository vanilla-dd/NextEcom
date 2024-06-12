import { SignIn } from "@/components/auth/signin-button";
import { ModeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <SignIn />
    </main>
  );
}
