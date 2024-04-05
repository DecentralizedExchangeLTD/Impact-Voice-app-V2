"use client";
import { Inter } from "next/font/google";
import { PrivyProvider } from "@privy-io/react-auth";
import { DataProvider } from "./hooks/ProposalProvider";
import { appID } from "./services/api";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Impact Voice</title>
        <meta name="description" content="A brief description of your page" />
        <meta name="keywords" content="impact, voice, proposals" />
        <meta name="author" content="Chuku Success" />
      </head>
      <body className={inter.className}>
        <DataProvider>
          <PrivyProvider
            appId={appID}
            config={{
              // Customize Privy's appearance in your app
              appearance: {
                theme: "light",
                accentColor: "#676FFF",
                logo: "https://impact-stream-eight.vercel.app/_next/image?url=%2Fafrica.png&w=256&q=75",
              },
              // Create embedded wallets for users who don't have a wallet
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
              },
              loginMethods: ["email", "wallet", "google", "sms"],
            }}
          >
            {children}
          </PrivyProvider>
        </DataProvider>
      </body>
    </html>
  );
}
