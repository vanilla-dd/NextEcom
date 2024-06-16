import bcrypt from "bcryptjs";
import { string, z } from "zod";

export const signInSchema = z.object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const saltRounds = 10;

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const createProductSchmea = z.object({
  name: z.string(),
  priceId: z.string(),
  defaultPrice: z.string(),
  description: z.string(),
  createdAt: z.date().nullable(),
  imgURL: z.string().nullable(),
});

export const sellFormSchema = z.object({
  productName: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  productImage: z.string().nullable(),
  supportEmail: z
    .string({ required_error: "Support Email can't be empty" })
    .email({ message: "Enter a valid email" }),
  productPitch: z
    .string({ required_error: "Tell users bit about your product" })
    .max(200, { message: "Shorter description makes better impression" }),
  websiteURL: z.string({ required_error: "Webite URL is required" }).min(2),
  producutCategory: z.enum([
    "Development & IT",
    "Operations",
    "Marketing",
    "Finance",
    "none",
  ]),
  productTag: z.enum([
    "Content marketing",
    "CRM",
    "Ecommerce",
    "Email marketing",
    "Ads",
    "Lead capture",
    "Lead generation",
    "Sales enablement",
    "Giveaways",
    "Event management",
    "Marketing automation",
    "Marketing planning",
    "Reputation management",
    "Marketing dashboard",
    "PR",
    "Proposal management",
    "Sales management",
    "Sales dashboard",
    "SEO",
    "Link management",
    "SMS communication",
    "Social proof platform",
    "Social media analytics",
    "Social media management",
    "Live streaming",
    "Webinar tool",
    "none",
  ]),
});

export function accountLink() {
  return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=http://localhost:3000/seller/dashboard`;
}
