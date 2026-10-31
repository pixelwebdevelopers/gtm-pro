"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface HelpQuestion {
  id: string;
  category: string;
  q: string;
  a: string;
  button?: {
    text: string;
    href: string;
    isExternal?: boolean;
    disabled?: boolean;
  };
}

const allFaqCategories = [
  "Getting Started",
  "Pricing & Licensing",
  "Brokers & Accounts",
  "Capital & Risk",
  "Strategy & Performance",
  "Setup & Installation",
  "VPS & Running 24/5",
  "Troubleshooting & Support",
];

const all71Faqs: HelpQuestion[] = [
  // CATEGORY 1 — GETTING STARTED (7)
  {
    id: "gs-1",
    category: "Getting Started",
    q: "What is GTM PRO and what does it do?",
    a: "GTM PRO is a trading robot (Expert Advisor) for MetaTrader, built and optimized specifically for XAUUSD (Gold). Gold is its default market, and it is not designed for other pairs out of the box. It places a straddle of pending orders (a Buy Stop and a Sell Stop around the price) and manages them with grid recovery and a shared basket take profit. It is a high-risk automated tool, and profit is never guaranteed.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    q: "Does GTM PRO work on MetaTrader 4 or MetaTrader 5?",
    a: "Both. We provide a MetaTrader 5 version (.ex5) and a MetaTrader 4 version (.ex4, coming soon). Download the one that matches your platform from our official download links.",
    button: { text: "Download for MetaTrader 5", href: "/#download" },
  },
  {
    id: "gs-3",
    category: "Getting Started",
    q: "Can I run GTM PRO on my phone (Android or iPhone)?",
    a: "No. GTM PRO only runs in the desktop MetaTrader 4 or 5 app, on a Windows PC, laptop or VPS. It cannot run on any phone, Android or iPhone. The MetaTrader mobile app can only be used to monitor your account and trades. For trading that runs around the clock, use a VPS.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    q: "How do I get GTM PRO?",
    a: "There are two ways. Direct License: a one-time lifetime payment that works with any broker and includes free upgrades. You register your MT account numbers: up to 5 on the 5 Accounts plan, or as many as you want on the Unlimited plan. Free Access: no license fee. Register under our official partner link with Vantage Markets or Exness, complete KYC and fund your account. Either way, your license is locked to the MT account numbers you register. See the Pricing section for costs.",
    button: { text: "View Pricing Plans", href: "/#pricing" },
  },
  {
    id: "gs-5",
    category: "Getting Started",
    q: "Is GTM PRO suitable for beginners?",
    a: "Yes. It runs on default settings, so there is no complicated setup, and installation is the same as any other MetaTrader EA. Just start small and only trade with money you can afford to lose. Our support team is on Telegram if you need help.",
  },
  {
    id: "gs-6",
    category: "Getting Started",
    q: "What do I need to get started with GTM PRO?",
    a: "An MT4 or MT5 account with a broker, the desktop MetaTrader app (on a PC, laptop or VPS), and a GTM PRO license (Direct License or Free Access). Once your MT account number is registered to your license, download the EA and presets, and you're ready. A VPS is recommended so the EA can run continuously.",
  },
  {
    id: "gs-7",
    category: "Getting Started",
    q: "What language are GTM PRO and its support available in?",
    a: "Our website, this Help Center and all guides are in English, and support is available on Telegram. MetaTrader itself can be switched to many languages in its own settings.",
  },

  // CATEGORY 2 — PRICING & LICENSING (9)
  {
    id: "pl-1",
    category: "Pricing & Licensing",
    q: "How can I get GTM PRO, and what's the difference between the Direct License and Free Access?",
    a: "There are two options. The Direct License is a one-time lifetime payment (see Pricing) that works with any broker, has no trading-volume conditions and includes free upgrades. Free Access has no fee: register under our official partner link with Vantage Markets or Exness, then complete KYC and make a deposit. Both are locked to the MT account numbers you register. The Direct License lets you register up to your plan's limit (5 accounts or unlimited), while Free Access is tied to your account under our partner network. Both give you the same EA for XAUUSD on MT4 and MT5.",
  },
  {
    id: "pl-2",
    category: "Pricing & Licensing",
    q: "How do I activate my license key?",
    a: "Attach the EA to an XAUUSD chart, open its Inputs tab and enter your license key. The EA verifies the key online, so your terminal must be connected to the internet. Your MT account must already be registered to your license, otherwise you will see a license error.",
  },
  {
    id: "pl-3",
    category: "Pricing & Licensing",
    q: "Do license keys expire? Do I have to pay again later?",
    a: "A Direct License is lifetime and never expires: no renewal fees, and free upgrades to all future versions. Free Access is also free, but it stays linked to the conditions of the partner (IB) program.",
  },
  {
    id: "pl-4",
    category: "Pricing & Licensing",
    q: "What do the plans (5 Accounts and Unlimited) mean?",
    a: "Each paid license has a plan that sets how many MT accounts you can register: 5 Accounts or Unlimited. Every key is bound to your registered account number(s), so the EA only runs on those accounts. \"Unlimited\" means there is no limit on how many accounts you can register. It does not mean the EA runs on any account automatically.",
  },
  {
    id: "pl-5",
    category: "Pricing & Licensing",
    q: "I have the Unlimited plan. Do I still need to register my MT accounts?",
    a: "Yes. On every plan, including Unlimited, at least one MT account must be registered to your license before the EA will run. Unlimited only removes the limit on how many accounts you can add. Each one still has to be registered, otherwise you will see a license error.",
  },
  {
    id: "pl-6",
    category: "Pricing & Licensing",
    q: "What happens to my Free Access if I stop trading or move my account to a different IB?",
    a: "Free Access depends on your account staying under our partner network. If you move your account to another IB or partner, Free Access cannot continue and the EA will stop running. If you prefer no IB or volume conditions, the Direct License works with any broker. Please contact support if your situation changes.",
  },
  {
    id: "pl-7",
    category: "Pricing & Licensing",
    q: "If I buy the Direct License, can I use it with any broker and on any computer?",
    a: "Yes. The Direct License works with any broker, has no volume conditions, and can be installed on any computer or VPS. Each MT account just needs to be registered to your license first, up to your plan's limit. The EA checks your license online, so the terminal needs an internet connection.",
  },
  {
    id: "pl-8",
    category: "Pricing & Licensing",
    q: "Is there a source-code license, and what does it include?",
    a: "Yes. A full source-code license is available; see the Pricing section for the current price. It is an offline version that needs no license key, it is yours to modify, and you can use it for life. Contact support for details.",
  },
  {
    id: "pl-9",
    category: "Pricing & Licensing",
    q: "How do I pay for a GTM PRO license?",
    a: "Payment is made in USDT. Choose your plan in the Pricing section to see the exact amount, the USDT wallet address and the network (TRC20). After paying, send the transaction screenshot and your MT4/MT5 account number to our admin on Telegram, and your license will be activated.",
    button: { text: "Contact Admin on Telegram →", href: "https://t.me/Ryan_Mitchell_GTMPRO", isExternal: true },
  },

  // CATEGORY 3 — BROKERS & ACCOUNTS (11)
  {
    id: "ba-1",
    category: "Brokers & Accounts",
    q: "Which brokers can I use with GTM PRO?",
    a: "Any MT4 or MT5 broker with a suitable Gold (XAUUSD) symbol: good spread, leverage, execution and account type. With a Direct License you can choose any broker. For Free Access, your account must be registered under our official partner link with Vantage Markets or Exness.",
  },
  {
    id: "ba-2",
    category: "Brokers & Accounts",
    q: "Should I use a cent account or a standard account?",
    a: "A cent account is recommended for smaller capital and live testing: you can start small and still trade in real market conditions. A standard account needs much more capital and more conservative settings. If you are new, start on a cent account and move to standard later. Either way, make sure your broker, leverage, spread, symbol name and .set file match the recommended setup.",
  },
  {
    id: "ba-3",
    category: "Brokers & Accounts",
    q: "What capital do I need, and is a cent account safer for testing?",
    a: "A cent account lets you start with a smaller balance and less real money at risk, so it is the usual choice for early testing. A standard account needs much more capital. The exact amount depends on your account type and your risk tolerance; see our setup guidance. Gold is volatile, so no balance is fully protected against loss.",
  },
  {
    id: "ba-4",
    category: "Brokers & Accounts",
    q: "Can I use my existing broker account instead of opening a new one?",
    a: "With a Direct License, yes, if your account meets the requirements (a suitable Gold symbol, spread, leverage and account type). For Free Access, you will usually need to open a new account or transfer your IB/partner to us through our official link. If you're not sure whether your account qualifies, check with support first.",
  },
  {
    id: "ba-5",
    category: "Brokers & Accounts",
    q: "I already have a broker account. How do I change or register my IB for Free Access?",
    a: "Free Access requires your account to be under our official partner network. If you don't have an account yet, register a new one using our official Vantage Markets or Exness link, which already includes our referral code. If you already have an account, you can request a transfer to us: for Vantage Markets, send the ready-made email shown on our Free Access page; for Exness, follow the \"Change my partner\" steps on the same page. A transfer can take a few days to be approved, and your EA access is activated only once your account appears under our network. Our support team can guide you.",
    button: { text: "Go to the Free Access page →", href: "/free-access" },
  },
  {
    id: "ba-6",
    category: "Brokers & Accounts",
    q: "Does the EA need a specific account type, leverage, or a swap-free (Islamic) account?",
    a: "Your account details matter: the symbol name (for example XAUUSD vs XAUUSDm), spread, leverage, server and account type (cent or standard) all affect performance. Higher leverage gives more margin room, but it does not reduce market risk. Swap-free (Islamic) accounts are supported, as long as the other details match. Confirm your details with support so your .set file matches your account.",
  },
  {
    id: "ba-7",
    category: "Brokers & Accounts",
    q: "My broker uses a different Gold symbol name, like XAUUSDm. Will the EA still work?",
    a: "Yes. Brokers may call Gold \"XAUUSD\" or add a suffix, such as \"XAUUSDm\". The EA trades whatever Gold symbol your broker offers, as long as the chart and .set file are set for that exact symbol. If trades are not opening, check the symbol name first. Support can help you match it.",
  },
  {
    id: "ba-8",
    category: "Brokers & Accounts",
    q: "Can I run the EA on multiple accounts?",
    a: "Yes, up to your plan's limit. Every license is locked to the MT account numbers you register: the 5 Accounts plan allows up to 5, and the Unlimited plan allows as many as you need, with any broker. Free Access is tied to the account(s) under our partner network. The EA only runs on registered accounts, so if you have several accounts, the Direct License is the most flexible option.",
  },
  {
    id: "ba-9",
    category: "Brokers & Accounts",
    q: "Cent accounts are not available with brokers in my country. What can I do?",
    a: "If a suitable account type isn't available with our partner brokers in your country, the Direct License is usually the best option. It works with any broker that offers a suitable Gold symbol and account type. Free Access depends on our partner link, which isn't available in every region. The EA needs a live MT4/MT5 account for long-term use. Contact support and we'll help you find the best setup for your location.",
  },
  {
    id: "ba-10",
    category: "Brokers & Accounts",
    q: "Can I test GTM PRO on a demo account first?",
    a: "Yes. GTM PRO runs on demo accounts without a license key, so you can practise the installation and watch the strategy with no real money at risk. However, a demo is for testing only and is not meant for long-term use: your license is built for a live MT account. For low-risk real testing, a cent live account is the usual choice, and you can also backtest in the MetaTrader Strategy Tester.",
  },
  {
    id: "ba-11",
    category: "Brokers & Accounts",
    q: "Which account type should I choose: Cent Standard, Cent Raw/ECN, or others?",
    a: "We recommend a Cent Standard account. GTM PRO opens many trades a day, and on Raw or ECN accounts every trade has a separate commission, which adds up fast with a grid strategy. Cent Standard accounts have no per-trade commission (the cost is in the spread), so they are more cost-effective. A cent account with around 50,000 USC or more is a common starting point. Just keep the Gold symbol, leverage and spread within the recommended setup.",
  },

  // CATEGORY 4 — CAPITAL & RISK (9)
  {
    id: "cr-1",
    category: "Capital & Risk",
    q: "How much capital do I need to start GTM PRO?",
    a: "On a cent account, around 10,000 USC is enough for testing only, but it is high risk. We recommend about 50,000 to 100,000 USC or more for better protection. There is no single right amount: it depends on your equity, leverage, account type, spread and preset. Only use money you can afford to lose.",
  },
  {
    id: "cr-2",
    category: "Capital & Risk",
    q: "What is the minimum capital for a cent account vs a standard account?",
    a: "On a cent account you can test with as little as about 10,000 USC (high risk), but 50,000 to 100,000 USC or more is the recommended range. Cent accounts let you start with much less real money at risk, which is why many beginners start there. Standard accounts need much more capital and larger minimum lots. Choose your capital based on how much drawdown you can handle, not on a profit goal.",
  },
  {
    id: "cr-3",
    category: "Capital & Risk",
    q: "How do I choose the right lot size?",
    a: "Base your lot size on your capital, equity, leverage, account type, spread and preset, never on a profit target. Because GTM PRO adds grid layers, a starting lot that is too big multiplies your exposure quickly and can lead to a margin call. Start with the default lot in the preset, and only increase it if your capital can truly support it.",
  },
  {
    id: "cr-4",
    category: "Capital & Risk",
    q: "Is any amount of capital 100% safe?",
    a: "No. No amount of capital is completely safe. GTM PRO can still face floating loss, drawdown, margin call and stop out. A bigger balance gives you more margin room, but it does not guarantee safety or profit. Only trade with money you can afford to lose.",
  },
  {
    id: "cr-5",
    category: "Capital & Risk",
    q: "What leverage should I use?",
    a: "It depends on your broker and account type; some offer 1:500 or higher. Higher leverage frees up margin so the EA can keep working during drawdown, but it does not reduce your risk and can build exposure faster. Choose your leverage together with your capital and a conservative preset.",
  },
  {
    id: "cr-6",
    category: "Capital & Risk",
    q: "What is the biggest risk when running GTM PRO?",
    a: "The biggest risk is rising floating drawdown during grid recovery. If the market keeps moving against the open basket, margin use increases and the account can move toward a margin call or stop out. Enough capital, a conservative preset and caution around high-impact news all help reduce this risk.",
  },
  {
    id: "cr-7",
    category: "Capital & Risk",
    q: "What causes a margin call or stop out with this EA?",
    a: "A margin call or stop out happens when floating drawdown grows until your free margin runs out, and the broker starts closing positions. With GTM PRO, this risk increases during grid recovery if the market trends strongly against the basket without pulling back. Keep enough capital as a margin buffer, use a controlled preset and lower your risk around volatile news.",
  },
  {
    id: "cr-8",
    category: "Capital & Risk",
    q: "How does my capital affect whether my account survives a bad move?",
    a: "Your account survives a bad move based on how much floating drawdown your equity and margin can absorb before a stop out. A larger, well-funded balance gives the grid more room to bring an adverse move back to take profit. Even so, an extreme move can overwhelm any balance, so treat your funds as risk capital and use conservative settings.",
  },
  {
    id: "cr-9",
    category: "Capital & Risk",
    q: "How should I manage capital and risk around high-impact news?",
    a: "High-impact news like NFP, CPI and FOMC can cause sharp gold moves that push up floating drawdown during the grid phase. GTM PRO's built-in news filter automatically pauses new cycles before and after these events. For extra safety, you can also reduce your risk around major releases and resume once the market settles. Always use a conservative preset and money you can afford to lose.",
  },

  // CATEGORY 5 — STRATEGY & PERFORMANCE (9)
  {
    id: "sp-1",
    category: "Strategy & Performance",
    q: "How does the GTM PRO strategy actually work?",
    a: "GTM PRO trades XAUUSD with a straddle of pending orders: a Buy Stop and a Sell Stop around the price. When one side is triggered, it manages that direction as a basket, adding positions with grid recovery if the market moves against it, and closes the whole basket at its take profit. Run it on an XAUUSD (Gold) chart. M5 is the recommended default, but the timeframe does not change the result.",
  },
  {
    id: "sp-2",
    category: "Strategy & Performance",
    q: "Does GTM PRO guarantee profit?",
    a: "No. No EA can guarantee profit or a risk-free return. Because it uses grid recovery, GTM PRO is still exposed to floating loss, drawdown, margin call and stop out, especially during extreme moves. Only trade with money you can afford to lose.",
  },
  {
    id: "sp-3",
    category: "Strategy & Performance",
    q: "How much profit can I make per day with the EA?",
    a: "There is no fixed amount, and we cannot promise any daily or monthly percentage. Results depend on market conditions, your capital, the preset and your risk settings. Anyone promising a guaranteed daily return is not being honest about trading. Test it yourself on a small account first and judge the results over time.",
  },
  {
    id: "sp-4",
    category: "Strategy & Performance",
    q: "Should I keep the EA running during high-impact news like NFP, CPI or FOMC?",
    a: "GTM PRO has a built-in news filter that automatically pauses new cycles before and after high-impact news, while open baskets are still managed to take profit. During major gold and USD news, spreads widen, slippage increases and prices move fast, which can cause much larger drawdowns. For extra safety, you can also reduce your risk around these events. Check the economic calendar in MetaTrader for upcoming releases.",
  },
  {
    id: "sp-5",
    category: "Strategy & Performance",
    q: "Can I see live results or run a backtest before deciding?",
    a: "Yes. On GTM PRO v1.0, backtesting in the MetaTrader Strategy Tester is available to every user, both paid license and Free Access, so you can run your own historical tests. You can also follow real results on our Telegram channel. Remember that backtests and past results do not guarantee future performance: real spreads, slippage and news are different from historical data. Treat past figures as examples only.",
    button: { text: "View Live Results →", href: "https://t.me/GTM_PRO", isExternal: true },
  },
  {
    id: "sp-6",
    category: "Strategy & Performance",
    q: "Why does the EA sometimes hold floating (losing) positions instead of closing them?",
    a: "That is how grid recovery works. When the price moves against the first trade, the EA holds it and may add more positions to improve the basket's average price. The goal is to close the whole basket at take profit instead of locking in a loss. This can recover drawdown, but it is also the main risk: a strong one-way move can grow the floating loss toward a margin call, so always keep enough free margin.",
  },
  {
    id: "sp-7",
    category: "Strategy & Performance",
    q: "How do I withdraw my profit, and how long should I keep the EA running?",
    a: "Withdrawals are made through your broker, not through the EA; the EA only trades. After withdrawing, keep enough free margin, and avoid large withdrawals that could leave an open basket short of margin. The EA is designed to run continuously (24/5) on a stable VPS.",
  },
  {
    id: "sp-8",
    category: "Strategy & Performance",
    q: "Does GTM PRO use martingale, and how do lot sizes grow in the grid?",
    a: "GTM PRO uses grid recovery: when the market moves against the basket, it can add positions to improve the average price and close everything at take profit. Depending on the preset, these grid orders can grow in size, similar to a martingale recovery. This is the main risk, because exposure can build up quickly in a strong trend. That's why enough capital and a conservative preset matter, and why you should never use a starting lot your balance can't support.",
  },
  {
    id: "sp-9",
    category: "Strategy & Performance",
    q: "Can I backtest GTM PRO?",
    a: "Yes. On GTM PRO v1.0, backtesting is available to every user, both paid license and Free Access. You can run GTM PRO in the MetaTrader Strategy Tester to test settings and past performance. Backtests do not guarantee future results, because real spreads, slippage and news are different from historical data.",
  },

  // CATEGORY 6 — SETUP & INSTALLATION (11)
  {
    id: "si-1",
    category: "Setup & Installation",
    q: "How do I download the GTM PRO file?",
    a: "Download GTM PRO from our official download links: choose the MetaTrader 5 version (.ex5) or the MetaTrader 4 version (.ex4, coming soon) for your platform. Downloads are open, so no login is needed. Always download from our official website to avoid fake copies.",
    button: { text: "Download for MetaTrader 5", href: "/#download" },
  },
  {
    id: "si-2",
    category: "Setup & Installation",
    q: "How do I install GTM PRO on MT4 or MT5?",
    a: "In MetaTrader, go to File → Open Data Folder, then open MQL4 (MT4) or MQL5 (MT5) → Experts. Copy the GTM PRO .ex4 or .ex5 file into that folder. Then restart MetaTrader, or right-click Expert Advisors in the Navigator and choose Refresh. GTM PRO will appear under Expert Advisors, ready to use. This only works on the desktop terminal.",
  },
  {
    id: "si-3",
    category: "Setup & Installation",
    q: "Which chart and timeframe should I use, and where do I enter the license key?",
    a: "Open an XAUUSD (Gold) chart and drag GTM PRO onto it. The timeframe does not change the result, so M5 is simply the recommended default; any timeframe works. In the settings window, open the Inputs tab, paste your license key into the license field and click OK. Any XAUUSD variant (for example with a suffix) works the same way, and you only need one chart running the EA.",
  },
  {
    id: "si-4",
    category: "Setup & Installation",
    q: "How do I turn on AutoTrading / Allow Algo Trading?",
    a: "In the EA settings window, tick \"Allow Algo Trading\" before clicking OK. Then make sure the Algo Trading (AutoTrading) button on the toolbar is ON. If the EA status on the chart shows it is active, the EA is running. If Algo Trading is off, no trades will open.",
  },
  {
    id: "si-5",
    category: "Setup & Installation",
    q: "The EA asks me to allow a WebRequest URL. What do I do?",
    a: "GTM PRO verifies your license online, so MetaTrader must be able to reach the license server. Go to Tools → Options → Expert Advisors, tick \"Allow WebRequest for listed URL\", add https://a689.link and click OK. Without this, the EA cannot check your license. Make sure your PC or VPS has a stable internet connection.",
  },
  {
    id: "si-6",
    category: "Setup & Installation",
    q: "Do I need to change any settings, or just use the defaults?",
    a: "Start with the default settings. They are already tuned for XAUUSD, so you don't need to change anything to begin. You can adjust inputs such as lot size, trailing, spread guard, session guard, daily loss limit and trend multiplier, but most users keep the defaults. Only change them once you fully understand the extra risk. To start over, simply re-attach the EA with its default inputs.",
  },
  {
    id: "si-7",
    category: "Setup & Installation",
    q: "How do I load a preset or .set file?",
    a: "Download the .set file from our Preset Files page (the \"Browse Preset Files\" button in Downloads). Open the page, enter your license key to unlock it, and download the preset for your pair. Then, in the EA settings, open the Inputs tab, click Load and select the .set file. The inputs will update to the preset's values; click OK to apply. Presets are optional: you don't need one for the default Gold setup. Only load a preset made for the same symbol.",
    button: { text: "Browse Preset Files →", href: "/download-set-files" },
  },
  {
    id: "si-8",
    category: "Setup & Installation",
    q: "What's the difference between the website presets and the default settings? Do I need to keep the chart open?",
    a: "The default settings are the standard, recommended Gold setup that most live accounts use. The presets on our Preset Files page are optional alternatives for specific setups (often more conservative). They are unlocked with your license key and loaded with the Load button in Inputs. The EA only runs while MetaTrader is open, the chart is attached and Algo Trading is on, so a VPS is strongly recommended for non-stop operation. If you see an error, our support team can help you read the Experts and Journal tabs.",
  },
  {
    id: "si-9",
    category: "Setup & Installation",
    q: "How do the session guard and start/end hour settings affect open trades?",
    a: "The session guard limits the hours in which the EA can open new baskets, helping you avoid quiet or unwanted periods. Outside these hours, it stops opening new trades but keeps managing any open basket toward take profit. These hours follow your broker's server time, which is often different from your local time, so check the time difference before changing them.",
  },
  {
    id: "si-10",
    category: "Setup & Installation",
    q: "What is the spread guard, and why does a high spread stop trades?",
    a: "The spread guard blocks new entries while the spread is wider than the limit you set. Gold spreads widen around news, the daily rollover and session opens, and entering at those times means a worse price, so the EA waits for the spread to return to normal. If the EA pauses at certain times, a high spread is a common and intended reason. A broker with tight Gold spreads reduces these pauses.",
  },
  {
    id: "si-11",
    category: "Setup & Installation",
    q: "Where do I get the preset (.set) files?",
    a: "Ready-made .set files are on our Preset Files page, linked from the Downloads section (\"Browse Preset Files\"). The page is protected, so unlock it with your license key, then download the preset for your pair. Presets are tuned for MT4 and MT5 at 1:500 and 1:2000 leverage. To use one, open the EA's Inputs tab, click Load and select the .set file. Presets are optional: the default settings already work for Gold.",
    button: { text: "Browse Preset Files →", href: "/download-set-files" },
  },

  // CATEGORY 7 — VPS & RUNNING 24/5 (7)
  {
    id: "vps-1",
    category: "VPS & Running 24/5",
    q: "Do I need a VPS to run GTM PRO?",
    a: "A VPS is strongly recommended for live trading. GTM PRO's grid and basket strategy must be managed all the time, so MetaTrader has to stay online 24/5. A VPS keeps it running with a stable connection, even when your own computer is off, which is far safer than a home PC.",
  },
  {
    id: "vps-2",
    category: "VPS & Running 24/5",
    q: "Can I run GTM PRO on my own PC or laptop instead of a VPS?",
    a: "Technically yes: the EA runs in the desktop MT4/MT5 terminal on any Windows PC or laptop. But for a grid/basket strategy, this is risky. If your computer sleeps, shuts down or loses internet, the EA stops managing your open trades. If you use a PC, it must be reliable and kept running 24/5, which is why we recommend a VPS.",
  },
  {
    id: "vps-3",
    category: "VPS & Running 24/5",
    q: "What happens if my PC is off, asleep, or loses internet?",
    a: "The EA stops the moment MetaTrader goes offline. It cannot open, adjust or close positions while your computer is off, asleep or disconnected. For a grid/basket strategy that needs constant management, this gap is risky if the market moves against an open basket. This is the main reason we recommend a 24/5 VPS.",
  },
  {
    id: "vps-4",
    category: "VPS & Running 24/5",
    q: "How do I choose a good VPS, and does latency matter?",
    a: "Yes. Lower latency (ping) to your broker's server means faster, more stable execution, which matters for fast gold trades. A useful tip: before buying, ask the VPS provider which location gives the lowest ping to your broker's server. If they need access to your platform, only share your read-only investor password, never your master password. Don't choose a location based on your broker's home country, because the real trading server may be somewhere else, such as London. Look for very low latency (ideally under 5 ms), enough RAM and CPU, and strong uptime, not just the cheapest plan.",
  },
  {
    id: "vps-5",
    category: "VPS & Running 24/5",
    q: "Can one VPS run multiple MetaTrader accounts at the same time?",
    a: "Yes. One VPS can run several MetaTrader terminals and accounts at once, as long as it has enough RAM and CPU. If you plan to run many terminals or charts, choose a bigger plan and keep an eye on the VPS load so execution stays stable.",
  },
  {
    id: "vps-6",
    category: "VPS & Running 24/5",
    q: "What happens on weekends or when the gold market is closed?",
    a: "Gold trades 24/5, so the market closes at the weekend and the EA simply waits. Any open basket stays open over the weekend and is exposed to a price gap when the market reopens, so check your risk and free margin before the weekend. Keep your VPS and MetaTrader running so the EA continues as soon as trading reopens.",
  },
  {
    id: "vps-7",
    category: "VPS & Running 24/5",
    q: "Which VPS do you recommend?",
    a: "We recommend MyForexVPS: a reliable forex VPS built for MetaTrader, online 24/5, with low-latency locations close to most brokers. You can use any provider, but choose a location near your broker's server, enough RAM and CPU, and strong uptime.",
    button: {
      text: "Visit MyForexVPS →",
      href: "https://myforexvps.com/billing/aff.php?aff=2395",
      isExternal: true,
    },
  },

  // CATEGORY 8 — TROUBLESHOOTING & SUPPORT (8)
  {
    id: "ts-1",
    category: "Troubleshooting & Support",
    q: "My EA is on, but it is not opening any trades. What should I check?",
    a: "Check these in order: the EA is on an XAUUSD M5 chart with Algo Trading ON; your license is valid (no license error on the chart); and https://a689.link is allowed under Tools → Options → Expert Advisors (WebRequest). No trades can also be normal: the market may be closed, the spread may be above the spread-guard limit, the session guard may be blocking that time, the news filter may be active, or the EA may simply be waiting for its next cycle. If it still does nothing, open the Experts and Journal tabs to look for an error.",
  },
  {
    id: "ts-2",
    category: "Troubleshooting & Support",
    q: "The EA shows \"Invalid license key\" on the chart. How do I fix it?",
    a: "This means the key in the EA's inputs is wrong or not recognized. Remove the EA, open its inputs again and re-enter the key exactly as you received it (no extra spaces or missing characters), then attach it again. If it is still rejected, contact our support on Telegram to confirm your key is active.",
  },
  {
    id: "ts-3",
    category: "Troubleshooting & Support",
    q: "The chart says \"License EXPIRED\" or \"License REVOKED\". What does that mean?",
    a: "\"License EXPIRED\" means the license period has ended. \"License REVOKED\" means the license was cancelled by us. In both cases, the EA will not trade. A lifetime Direct License does not expire, so \"EXPIRED\" usually relates to a time-limited or Free Access arrangement, while \"REVOKED\" is set manually on the server. Re-entering the key will not fix it; please contact our support on Telegram to renew or restore it.",
  },
  {
    id: "ts-4",
    category: "Troubleshooting & Support",
    q: "The EA says \"This license is bound to a different MT account\". How do I fix it?",
    a: "This means the MT account running the EA is not registered to your license. Contact our support on Telegram with this exact MT account number (the same one shown in your platform) so it can be registered to your license, then restart the EA.",
  },
  {
    id: "ts-5",
    category: "Troubleshooting & Support",
    q: "The EA says \"This license is not yet bound to any MT account\". What do I do?",
    a: "This means no MT account has been registered to your license yet, so the EA cannot start. Contact our support on Telegram with your MT account number to register it, then restart the EA. This is required on every plan, including Unlimited.",
  },
  {
    id: "ts-6",
    category: "Troubleshooting & Support",
    q: "The EA shows it cannot reach the license server. What causes this?",
    a: "This is a network or WebRequest problem: the EA could not connect to the license server. Check that your PC or VPS has a working internet connection. Then go to Tools → Options → Expert Advisors, tick \"Allow WebRequest for listed URL\", add https://a689.link and restart the EA. If you are behind a firewall or on a restricted network, make sure MetaTrader's outgoing connections are not blocked.",
  },
  {
    id: "ts-7",
    category: "Troubleshooting & Support",
    q: "How do I allow WebRequest so the EA can verify my license?",
    a: "The EA checks its license online, so its URL must be allowed. In MetaTrader, go to Tools → Options → Expert Advisors, tick \"Allow WebRequest for listed URL\", add https://a689.link, click OK and restart the EA. If you skip this, the EA cannot reach the license server.",
  },
  {
    id: "ts-8",
    category: "Troubleshooting & Support",
    q: "I just updated to a new EA version. What should I do, and how do I get support?",
    a: "After downloading the new version, replace the old EA file, then attach it again to an XAUUSD M5 chart with the same license key and Algo Trading ON. Check that the WebRequest URL is still allowed, as a new version may use a different one. If you have a problem, take screenshots of any errors in the Experts and Journal tabs, along with your inputs, and send them to our support on Telegram.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return all71Faqs.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const qLower = searchQuery.toLowerCase();
      return (
        item.q.toLowerCase().includes(qLower) ||
        item.a.toLowerCase().includes(qLower) ||
        item.category.toLowerCase().includes(qLower)
      );
    });
  }, [searchQuery, activeCategory]);

  const toggleOpen = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const nextMap: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => (nextMap[f.id] = true));
    setOpenMap(nextMap);
  };

  const handleCollapseAll = () => {
    setOpenMap({});
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Navbar />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#E8C97A] transition-colors"
          >
            ← Back to GTM PRO
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-black tracking-widest text-[#E8C97A] uppercase block">
            HELP CENTER
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Can We Help?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
            Clear answers about GTM PRO: licensing, brokers, capital and risk, setup, VPS and troubleshooting.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-2xl border border-white/15 bg-zinc-950/90 px-5 py-4 pl-12 text-sm text-white placeholder-zinc-500 shadow-xl focus:border-[#C9A84C] focus:outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "All"
                ? "bg-[#C9A84C] text-black shadow"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            All Questions ({all71Faqs.length})
          </button>
          {allFaqCategories.map((cat) => {
            const count = all71Faqs.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#C9A84C] text-black shadow"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Question count and Collapse All */}
        <div className="mt-8 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-semibold text-zinc-400">
          <span>{filteredFaqs.length} questions</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExpandAll}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Expand all
            </button>
            <span>·</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* 71 Questions List */}
        <div className="mt-6 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              No questions found matching &ldquo;{searchQuery}&rdquo;. Try another term or contact support.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openMap[faq.id] ?? false;
              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="rounded-2xl border border-white/10 bg-zinc-950/70 overflow-hidden hover:border-[#C9A84C]/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(faq.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#E8C97A] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.q}
                      </h3>
                    </div>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-400 text-xs font-bold mt-1">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 p-5 pt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
                      <p>{faq.a}</p>

                      {/* Golden Button inside answer if defined */}
                      {faq.button && (
                        <div>
                          {faq.button.isExternal ? (
                            <a
                              href={faq.button.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-4 py-2 text-xs font-black text-zinc-950 shadow hover:brightness-110 active:scale-95"
                            >
                              {faq.button.text}
                            </a>
                          ) : (
                            <Link
                              href={faq.button.href}
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-4 py-2 text-xs font-black text-zinc-950 shadow hover:brightness-110 active:scale-95"
                            >
                              {faq.button.text}
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Answer footer: Copy Link */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-500">
                        <span>FAQ ID: {faq.id}</span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(faq.id, e)}
                          className="hover:text-[#E8C97A] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                        >
                          <span>🔗</span>
                          <span>{copiedId === faq.id ? "Link Copied! ✓" : "Copy link"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* BOTTOM BOX — STILL HAVE A QUESTION? */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-black/60 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-40 bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

          <h3 className="text-2xl font-black text-white relative z-10">
            Still Have a Question?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 relative z-10 max-w-md mx-auto">
            Can&apos;t find the answer you need? Our team is ready to help you on Telegram.
          </p>

          <div className="mt-6 relative z-10">
            <a
              href="https://t.me/Ryan_Mitchell_GTMPRO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-8 py-3.5 text-xs sm:text-sm font-black text-zinc-950 shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
                <path d="M9 13l5.5-5.5" />
              </svg>
              <span>Contact Support</span>
            </a>
          </div>

          <span className="mt-4 block text-[11px] font-mono text-zinc-500 relative z-10">
            GTM PRO v1.0
          </span>
        </div>
      </div>

      <Footer />
    </main>
  );
}

