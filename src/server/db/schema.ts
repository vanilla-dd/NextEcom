import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const RoleEnum = pgEnum("role", ["seller", "user", "admin"]);
export const productTypeEnum = pgEnum("productType", [
  "recurring",
  "digital",
  "redeem",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: RoleEnum("role").default("user"),
  stripeId: text("stripeId").unique(),
  connectId: text("connectId").unique(),
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

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  websiteUrl: text("url").notNull(),
  namedUrl: text("namedUrl").unique().notNull(),
  imageUrl: text("image_url"),
  supportEmail: text("support_email").notNull(),
  // category: text("category"),
  // tags: text("tags"),
  inventory: integer("inventory").default(0),
  price: integer("price").notNull(),
  stripeConnectId: text("stripe_connect_id").notNull(),
  currency: text("currency").default("USD"),
  type: productTypeEnum("type").default("redeem"),
  csvUrl: text("csvUrl").unique(),
  // discount: numeric("discount", { precision: 5, scale: 2 }).default(0),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productStripeDetails = pgTable("product_stripe_details", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  stripeId: text("stripe_id").notNull(),
  description: text("description"),
  defaultPrice: text("defaultPrice").notNull(),
  imageUrl: text("image_url"),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  stripeId: text("stripe_id").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productClicks = pgTable("product_clicks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  clickCount: integer("click_count").default(1),
  clickedAt: timestamp("clicked_at").defaultNow(),
  totalClicked: integer("total_clicked").default(0),
});

// New Table for Order Analytics
export const orderAnalytics = pgTable("order_analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  totalRevenue: integer("total_revenue").default(0),
  totalOrders: integer("total_orders").default(0),
  lastOrderAt: timestamp("last_order_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
