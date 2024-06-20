"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateProduct from "@/components/forms/CreateProduct";

export default function ShowCreateForm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open ? (
        <div className="flex w-fit flex-col gap-4 rounded-md border px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold">Add Product</h1>
            <p className="text-sm font-light">
              Fill the form to add an product to sell
            </p>
          </div>
          <Button className="w-full" onClick={() => setOpen(!open)}>
            Fill Form
          </Button>
        </div>
      ) : (
        <CreateProduct />
      )}
    </>
  );
}
