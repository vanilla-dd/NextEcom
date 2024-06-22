"use server";

import { getFormattedCurr } from "@/lib/helpers";
import { db } from "@/server/db";
import Link from "next/link";
import React from "react";

async function page() {
  const products = await db.query.products.findMany({ limit: 10 });

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => {
        return (
          <Link
            href={`/buy/${product.namedUrl}`}
            key={product.id}
            className="flex max-w-[30ch] flex-col items-center justify-center border px-2 py-4 text-center"
          >
            <img
              src={product.imageUrl ? product.imageUrl : ""}
              alt="Product Logo"
              className="aspect-video h-32 w-full rounded-md object-cover"
            />
            <p className="text-3xl font-bold">{product.name}</p>
            <p className="text-sm">{product.description}</p>
            <p>tags?</p>
            <p>
              {getFormattedCurr(product.currency?.toUpperCase(), product.price)}
              /
              {product.type === "redeem" || product.type === "digital"
                ? "Lifetime"
                : "Subscription"}
            </p>
            <p>Reviews?</p>
            <p>{product.inventory} to show or hide</p>
          </Link>
        );
      })}
    </div>
  );
}

export default page;
