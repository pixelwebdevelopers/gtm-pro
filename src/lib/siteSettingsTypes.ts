export interface PreHeaderSettings {
  enabled: boolean;
  badge: string;
  highlightText: string;
  mainText: string;
  broker1Name: string;
  broker1Link: string;
  broker2Name: string;
  broker2Link: string;
  postText: string;
}

export interface StatsSettings {
  liveBadgeText: string;
  activatedToday: number;
  activatedLabel: string;
  runningNow: number;
  runningLabel: string;
}

export interface PricingPlan {
  badge?: string;
  tag?: string;
  title: string;
  price: string;
  period?: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonLink?: string;
}

export interface PricingSettings {
  heading: string;
  subheading: string;
  usdtWallet: string;
  telegramLink: string;
  freePlan: PricingPlan;
  fiveAccountsPlan: PricingPlan;
  unlimitedPlan: PricingPlan;
  whiteLabelPlan: PricingPlan;
  sourceCode: {
    badge: string;
    title: string;
    highlightTitle: string;
    description: string;
    price: string;
    subtitle: string;
    features: string[];
  };
}

export interface SiteSettings {
  preHeader: PreHeaderSettings;
  stats: StatsSettings;
  pricing: PricingSettings;
  updatedAt?: string;
}

export const defaultPreHeader: PreHeaderSettings = {
  enabled: true,
  badge: "🎁 New Client Offer",
  highlightText: "FREE until Nov 30, 2026:",
  mainText: "full access, all features. Register with",
  broker1Name: "Vantage Markets",
  broker1Link: "https://vigco.co/la-com-inv/9XhUYs8x",
  broker2Name: "Exness",
  broker2Link: "https://one.toexness.com/a/53of1lwuw5",
  postText: "via our IB link. No payment needed.",
};

export const defaultStats: StatsSettings = {
  liveBadgeText: "LIVE ACTIVITY",
  activatedToday: 17,
  activatedLabel: "GTM PRO Licenses Activated Today",
  runningNow: 2037,
  runningLabel: "GTM PRO EAs Running Now",
};

export const defaultPricing: PricingSettings = {
  heading: "Get GTM PRO",
  subheading: "Start free, or choose a lifetime license. Test everything on demo first.",
  usdtWallet: "TJiS8efyHdCcP1vXw6DvvtCRqLv8GzWbs8",
  telegramLink: "https://t.me/Ryan_Mitchell_GTMPRO",
  freePlan: {
    badge: "FREE OPTION",
    title: "Free Access",
    price: "FREE",
    period: "",
    subtitle: "Via Vantage Markets or Exness IB registration",
    features: [
      "1 MT4/MT5 account",
      "All automated features",
      "Cent & Standard accounts",
      "Free future updates",
    ],
    buttonText: "Register via My Link",
    buttonLink: "/free-access",
  },
  fiveAccountsPlan: {
    badge: "DIRECT LICENSE",
    title: "5 Accounts",
    price: "$299 USDT",
    period: "/ one-time",
    subtitle: "Perfect for most traders",
    features: [
      "Up to 5 MT4/MT5 accounts",
      "Use with any broker",
      "Lifetime license",
      "Free upgrades to all future versions",
      "Priority support",
    ],
    buttonText: "Buy Now",
  },
  unlimitedPlan: {
    badge: "UNLIMITED ACCESS",
    tag: "BEST VALUE",
    title: "Unlimited",
    price: "$1,065 USDT",
    period: "/ one-time",
    subtitle: "For traders managing multiple accounts",
    features: [
      "Unlimited MT4/MT5 accounts",
      "Use with any broker",
      "Includes GTM Bull & GTM Bear EAs",
      "Lifetime license",
      "Free upgrades to all future versions",
      "Priority 1-on-1 setup support",
    ],
    buttonText: "Buy Now",
  },
  whiteLabelPlan: {
    badge: "WHITE-LABEL",
    tag: "NEW",
    title: "Your Own Brand",
    price: "$4,999",
    period: "/ one-time",
    subtitle: "For trading educators, IBs & signal providers",
    features: [
      "GTM PRO EA under YOUR brand name",
      "Your name on dashboard, logs, alerts & order comments",
      "Your website link & contact details",
      "Unique magic numbers — runs safely alongside other EAs",
      "Optional broker lock",
      "Same strategy updates as GTM PRO",
      "Powered by our secure licensing server",
    ],
    buttonText: "Discuss on Telegram",
    buttonLink: "https://t.me/Ryan_Mitchell_GTMPRO",
  },
  sourceCode: {
    badge: "FOR DEVELOPERS & PARTNERS",
    title: "Get the",
    highlightTitle: "Source Code",
    description:
      "Full MQL4 & MQL5 source code for GTM PRO v1.0. Read every line, modify the logic, connect it to your own tools, or build something new on top of it.",
    price: "$26,900",
    subtitle: "One-time payment · Lifetime ownership · No refund",
    features: [
      "Full MQL4 (.mq4) & MQL5 (.mq5) source",
      "Modify, customize & rebrand",
      "No license server lock-in",
      "Developer support",
    ],
  },
};

export const defaultSiteSettings: SiteSettings = {
  preHeader: defaultPreHeader,
  stats: defaultStats,
  pricing: defaultPricing,
};
