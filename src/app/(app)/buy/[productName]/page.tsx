"use server";

import BuyButton from "@/components/buy/BuyButton";
import { db } from "@/server/db";
import { productStripeDetails, products } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: { productName: string };
}) {
  const [extendedProductDetail] = await db
    .select({
      product: products,
      productStripeDetails: productStripeDetails,
    })
    .from(products)
    .leftJoin(
      productStripeDetails,
      eq(products.id, productStripeDetails.productId),
    )
    .where(eq(products.namedUrl, params.productName));
  return (
    <div>
      My product: {params.productName}
      <p>{extendedProductDetail.product.id}</p>
      <BuyButton
        checkoutSessionParams={{
          connectedId: extendedProductDetail.product.stripeConnectId,
          currency: extendedProductDetail.product.currency ?? "usd",
          priceId: extendedProductDetail.productStripeDetails?.defaultPrice!,
          price: extendedProductDetail.product.price,
          productNamedUrl: extendedProductDetail.product.namedUrl,
        }}
      >
        Hleo
      </BuyButton>
    </div>
  );
}
