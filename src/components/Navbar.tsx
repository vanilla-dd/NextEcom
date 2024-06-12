import { auth } from "@/auth";
import React from "react";

async function Navbar() {
  const session = await auth();
  return (
    <header>
      <nav>
        <ul className="m-1 mx-1 flex px-1 py-1">
          <li>logo</li>
          <li>User Icon</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
