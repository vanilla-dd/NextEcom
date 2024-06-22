import bcrypt from "bcryptjs";
import Stripe from "stripe";
import { string, z } from "zod";
import {
  File,
  Users,
  Settings,
  LineChart,
  SquareGanttChart,
  LayoutGrid,
} from "lucide-react";

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

export const createProductSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name can't be empty.",
  }),
  productFeaturedImage: z.string().nullable(),
  supportEmail: z
    .string({ required_error: "Support Email can't be empty." })
    .email({ message: "Enter a valid email." }),
  productPitch: z
    .string({ required_error: "Tell users bit about your product." })
    .min(10, { message: "Description should be at least 10 character long" })
    .max(200, { message: "Shorter description makes better impression.s" }),
  websiteURL: z
    .string({ required_error: "Webite URL is required." })
    .min(2)
    .url({ message: "Enter a valid URL." }),
  producutCategory: z
    .enum(["Development & IT", "Operations", "Marketing", "Finance", "none"])
    .nullable(),
  productTag: z
    .enum([
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
    ])
    .nullable(),
  planType: z.enum(["one", "multiple"]).default("one"),
  productType: z.enum(["redeem", "license", "download"]),
  productFeatures: z
    .array(z.object({ value: z.string() }).optional())
    .min(1, { message: "At least one feature is needed" }),
  redeemCodeUrl: z.string().url().optional(),
  price: z
    .string()
    .min(1)
    .max(10000)
    .transform((ctx) => parseInt(ctx)),
  namedUrl: z.string().optional(),
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
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

// Dashboard Sidebar

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/seller/dashboard",
          label: "Dashboard",
          active: pathname.endsWith("/seller/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Product",
      menus: [
        {
          href: "/seller/dashboard/products",
          label: "See Product",
          active: pathname.includes("/dashboard/products"),
          icon: SquareGanttChart,
          submenus: [
            {
              href: "/seller/dashboard/products",
              label: "All Products",
              active: pathname === "/seller/dashboard/products",
            },
            {
              href: "/seller/dashboard/products/manage",
              label: "Manage Products",
              active: pathname === "/seller/dashboard/products/manage",
            },
          ],
        },
        {
          href: "/seller/dashboard/analytic",
          label: "Analytic",
          active: pathname.includes("/seller/dashboard/analytic"),
          icon: LineChart,
          submenus: [],
        },
        {
          href: "/seller/dashboard/users",
          label: "Users",
          active: pathname.includes("/seller/dashboard/users"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/seller/dashboard/docs",
          label: "Docs",
          active: pathname.includes("/seller/dashboard/docs"),
          icon: File,
          submenus: [],
        },
        {
          href: "/seller/dashboard/account",
          label: "Account",
          active: pathname.includes("/seller/dashboard/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

// uploadthng
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export function generateSlug(name: string, maxLength: number = 20): string {
  let slug = name
    .normalize("NFKD") // Normalize to NFKD form
    .replace(/[\u0300-\u036F]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

  // Truncate the slug to the specified max length
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/g, ""); // Remove trailing hyphens after truncation
  }

  return slug;
}
