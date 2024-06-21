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
            className="border px-2 py-4"
          >
            <img
              src={product.imageUrl ? product.imageUrl : ""}
              alt="Product Logo"
              width={100}
              height={100}
            />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>
              {getFormattedCurr(product.currency?.toUpperCase(), product.price)}
            </p>
            <p>{product.inventory}</p>
            <p>{product.type}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default page;
