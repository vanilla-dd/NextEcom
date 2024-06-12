import { db } from "../db";

export async function getUserFromDb(email: string, pwHash: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) =>
      eq(users.email, email) && eq(users.password, pwHash),
  });
}
