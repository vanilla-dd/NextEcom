import bcrypt from "bcryptjs";
import Stripe from "stripe";
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
  return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.BASE_URL}/seller/dashboard`;
}

// Extend the Stripe.Product type to include default_price
export interface ProductWithDefaultPrice extends Stripe.Product {
  default_price?: Stripe.Price;
}

type CurrencySymbols = {
  [key: string]: string; // Index signature to allow string keys
};
// Just in case for backup
const currencySymbols: CurrencySymbols = {
  AED: "د.إ",
  AFN: "؋",
  ALL: "L",
  AMD: "֏",
  ANG: "ƒ",
  AOA: "Kz",
  ARS: "$",
  AUD: "$",
  AWG: "ƒ",
  AZN: "₼",
  BAM: "KM",
  BBD: "$",
  BDT: "৳",
  BGN: "лв",
  BHD: ".د.ب",
  BIF: "FBu",
  BMD: "$",
  BND: "$",
  BOB: "Bs.",
  BRL: "R$",
  BSD: "$",
  BTN: "Nu.",
  BWP: "P",
  BYN: "Br",
  BZD: "$",
  CAD: "$",
  CDF: "FC",
  CHF: "CHF",
  CLP: "$",
  CNY: "¥",
  COP: "$",
  CRC: "₡",
  CUP: "$",
  CVE: "$",
  CZK: "Kč",
  DJF: "Fdj",
  DKK: "kr",
  DOP: "$",
  DZD: "د.ج",
  EGP: "£",
  ERN: "Nfk",
  ETB: "Br",
  EUR: "€",
  FJD: "$",
  FKP: "£",
  FOK: "kr",
  GBP: "£",
  GEL: "₾",
  GGP: "£",
  GHS: "₵",
  GIP: "£",
  GMD: "D",
  GNF: "FG",
  GTQ: "Q",
  GYD: "$",
  HKD: "$",
  HNL: "L",
  HRK: "kn",
  HTG: "G",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  IMP: "£",
  INR: "₹",
  IQD: "ع.د",
  IRR: "﷼",
  ISK: "kr",
  JEP: "£",
  JMD: "$",
  JOD: "د.ا",
  JPY: "¥",
  KES: "KSh",
  KGS: "лв",
  KHR: "៛",
  KID: "$",
  KMF: "CF",
  KRW: "₩",
  KWD: "د.ك",
  KYD: "$",
  KZT: "₸",
  LAK: "₭",
  LBP: "ل.ل",
  LKR: "Rs",
  LRD: "$",
  LSL: "L",
  LYD: "ل.د",
  MAD: "د.م.",
  MDL: "L",
  MGA: "Ar",
  MKD: "ден",
  MMK: "K",
  MNT: "₮",
  MOP: "P",
  MRU: "UM",
  MUR: "₨",
  MVR: "Rf",
  MWK: "MK",
  MXN: "$",
  MYR: "RM",
  MZN: "MT",
  NAD: "$",
  NGN: "₦",
  NIO: "C$",
  NOK: "kr",
  NPR: "₨",
  NZD: "$",
  OMR: "ر.ع.",
  PAB: "B/.",
  PEN: "S/",
  PGK: "K",
  PHP: "₱",
  PKR: "₨",
  PLN: "zł",
  PYG: "Gs",
  QAR: "ر.ق",
  RON: "lei",
  RSD: "дин.",
  RUB: "₽",
  RWF: "FRw",
  SAR: "ر.س",
  SBD: "$",
  SCR: "₨",
  SDG: "ج.س.",
  SEK: "kr",
  SGD: "$",
  SHP: "£",
  SLL: "Le",
  SOS: "Sh",
  SRD: "$",
  SSP: "£",
  STN: "Db",
  SYP: "£",
  SZL: "E",
  THB: "฿",
  TJS: "ЅМ",
  TMT: "T",
  TND: "د.ت",
  TOP: "T$",
  TRY: "₺",
  TTD: "$",
  TVD: "$",
  TWD: "NT$",
  TZS: "Sh",
  UAH: "₴",
  UGX: "Sh",
  USD: "$",
  UYU: "$",
  UZS: "сўм",
  VES: "Bs.S",
  VND: "₫",
  VUV: "VT",
  WST: "T",
  XAF: "FCFA",
  XCD: "$",
  XOF: "CFA",
  XPF: "₣",
  YER: "﷼",
  ZAR: "R",
  ZMW: "ZK",
  ZWL: "$",
};

// Example usage:
export const getCurrSymbol = (currency: string) => {
  return currencySymbols["INR"] || currency;
};

export const getFormattedCurr = (
  currencyCode: string | undefined,
  amount: number | null,
) => {
  if (!currencyCode || !amount) return;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(amount);
};
