import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirectTo: "/",
        });
      }}
      className="flex w-full flex-col gap-3"
    >
      <label className="relative flex flex-col gap-1 font-semibold before:absolute before:bottom-11 before:left-[46px] before:text-sm before:font-normal before:text-red-600 before:content-['*']">
        Email
        <input
          name="email"
          type="email"
          required={true}
          className="h-8 rounded-md border px-2 font-normal outline-2 outline-gray-400"
        />
      </label>
      <label className="before:hover:after:visited: relative flex flex-col gap-1 font-semibold before:absolute before:bottom-11 before:left-20 before:cursor-pointer before:text-sm before:font-normal before:text-red-600 before:content-['*']">
        Password
        <input
          name="password"
          type="password"
          required={true}
          className="h-8 rounded-md border px-2 font-normal outline-2 outline-gray-400"
        />
      </label>
      <Button>Sign In</Button>
    </form>
  );
}
