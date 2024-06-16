import { eq } from "drizzle-orm";
import { db } from "../db";
import { productDetails, productStripeDetail, users } from "../db/schema";

export async function getProduct() {
  return await db
    .select()
    .from(productDetails)
    .fullJoin(
      productStripeDetail,
      eq(productDetails.id, productStripeDetail.productDetailsId),
    );
}
