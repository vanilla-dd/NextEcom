import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const RoleEnum = pgEnum("roles", ["user", "seller"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: RoleEnum("roles").default("user"),
  stripeId: text("stripeId").unique(),
  connectId: text("connectId"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const productDetails = pgTable("productDetails", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productTitle: text("productTitle").notNull().unique(),
  productDescription: text("productDescription").notNull(),
  productURL: text("productURL").notNull(),
  productImgURL: text("productImgURL"),
  productSupportEmail: text("productSupportEmail").notNull(),
  userId: text("userId")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const productStripeDetail = pgTable("productStripeDetail", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  productStripeName: text("productStripeName"),
  productStripeId: text("productStripeId").notNull(),
  productStripeDescription: text("productStripeDescription").notNull(),
  prodcutDefaultPrice: text("productDefaultPrice").notNull(),
  createdAt: text("createdAt"),
  productStripeImgURL: text("productStripeImgURL"),
  productDetailsId: text("productDetailsId")
    .notNull()
    .references(() => productDetails.id),
});
