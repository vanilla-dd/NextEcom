"use client";
import { Button } from "@/components/ui/button";
import { ProductWithDefaultPrice, getFormattedCurr } from "@/lib/helpers";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import React from "react";

function ProductCard({ product }: { product: ProductWithDefaultPrice }) {
  return (
    <div className="relative">
      {product.active ? (
        <div className="absolute -right-3 -top-1 aspect-square w-2.5 animate-pulse cursor-pointer rounded-full bg-green-400 before:invisible before:absolute before:-top-8 before:right-1/2 before:translate-x-1/2 before:animate-none before:rounded-md before:bg-black before:px-3 before:py-1 before:text-xs before:text-white before:opacity-0 before:transition-opacity before:delay-200 before:content-['Active'] hover:before:visible hover:before:opacity-100"></div>
      ) : (
        <div className="before:-top4 absolute -right-3 -top-1 aspect-square w-2.5 animate-pulse cursor-pointer rounded-full bg-red-600 before:invisible before:absolute before:-top-8 before:right-1/2 before:w-max before:translate-x-1/2 before:animate-none before:rounded-md before:bg-black before:px-3 before:py-1 before:text-xs before:text-white before:opacity-0 before:transition-opacity before:delay-200 before:content-['Not_Active'] hover:before:visible hover:before:opacity-100"></div>
      )}
      <div className="flex items-start gap-2">
        <Image
          src={product.images[0]}
          alt="Product Image"
          width={100}
          height={100}
        />
        <div className="max-w-[40ch] break-words break-all">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            {getFormattedCurr(
              product.default_price?.currency.toUpperCase(),
              product.default_price?.unit_amount_decimal
                ? +product.default_price?.unit_amount_decimal / 100
                : null,
            )}
          </p>

          <p>
            Created At:
            {new Date(product.created * 1000).toLocaleDateString()}
          </p>
          <p>{product.default_price?.type}</p>
          <p>{JSON.stringify(product.default_price?.metadata)}</p>
          <p>{JSON.stringify(product.metadata)}</p>
          <Button
            onClick={() => {}}
            className="flex items-center justify-center gap-1"
            disabled={
              product.deleted ||
              product.default_price === null ||
              !product.active
            }
          >
            Select <DollarSign className="w-4" />
          </Button>
        </div>
        {/* {product.default_price?.custom_unit_amount} */}
        {/* {product.default_price?.livemode} */}
        {/* {product.default_price?.lookup_key} */}
        {/* {product.default_price?.nickname} */}
        {/* {product.default_price?.object} */}
        {/* <p>
          {product.default_price?.recurring?.interval}
          {product.default_price?.recurring?.interval_count}
          {product.default_price?.recurring?.trial_period_days}
          {product.default_price?.recurring?.usage_type}
        </p> */}
      </div>
    </div>
  );
}

export default ProductCard;
