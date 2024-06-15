"use server";

import { z } from "zod";
import { sellFormSchema } from "@/lib/helpers";
import { productDetails, users } from "../db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function createSellerAcc(data: z.infer<typeof sellFormSchema>) {
  const session = await auth();
  if (!session || !session.user?.id) return;
  // doesnt support this rns
  // await db.transaction(
  //   async (tx) => {
  //     await tx.update(users).set({ role: "seller" });
  //     await tx.insert(productDetails).values({
  //       userId: session.user?.id!,
  //       productTitle: data.productName,
  //       productDescription: data.productPitch,
  //       productSupportEmail: data.supportEmail,
  //       productURL: data.websiteURL,
  //       productImgURL: data.productImage || "",
  //     });
  //   },
  //   {
  //     isolationLevel: "read committed",
  //     accessMode: "read write",
  //     deferrable: true,
  //   },
  // );

  await db.update(users).set({ role: "seller" });
  await db.insert(productDetails).values({
    userId: session.user?.id!,
    productTitle: data.productName,
    productDescription: data.productPitch,
    productSupportEmail: data.supportEmail,
    productURL: data.websiteURL,
    productImgURL: data.productImage || "",
  });
  revalidatePath("/seller");
}
