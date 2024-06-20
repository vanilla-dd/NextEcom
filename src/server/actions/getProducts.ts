import { eq } from "drizzle-orm";
import { db } from "../db";
import { productStripeDetails, products } from "../db/schema";

export async function getProduct() {
  return await db
    .select()
    .from(products)
    .fullJoin(
      productStripeDetails,
      eq(products.id, productStripeDetails.productId),
    );
}
