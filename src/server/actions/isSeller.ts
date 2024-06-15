"use server";

import { auth } from "@/auth";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { users } from "../db/schema";

export async function getIsSeller() {
  const session = await auth();
  if (!session || !session.user?.id) return;
  console.log(session.user.id);
  return await db
    .select()
    .from(users)
    .limit(1)
    .where(and(eq(users.id, session.user.id), eq(users.role, "seller")));
}
