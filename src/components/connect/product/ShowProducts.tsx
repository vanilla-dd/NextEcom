import React from "react";
import ProductCard from "./ProductCard";
import { ProductWithDefaultPrice } from "@/lib/helpers";

export default function ShowProducts({
  products,
}: {
  products: ProductWithDefaultPrice[];
}) {
  console.log(products);

  return (
    <div className="grid gap-2 gap-y-6 sm:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="rounded-md border-2 px-4 py-2">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
