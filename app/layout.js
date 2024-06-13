"use client";
import { Inter } from "next/font/google";
import { PrivyProvider } from "@privy-io/react-auth";
import { DataProvider } from "./hooks/ProposalProvider";
import { appID } from "./services/api";
import { optimism } from "viem/chains"; // no etherium sepolia which is our chain
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Impact Voice</title>
        <meta name="description" content="Let your voice be heard" />
        <meta name="keywords" content="impact, voice, proposals" />
        <meta name="author" content="Chuku Success" />
      </head>
      <body className={inter.className}>
        <DataProvider>
          <PrivyProvider
            appId={appID}
            config={{
              appearance: {
                theme: "light",
                accentColor: "#676FFF",
                logo: "https://impact-stream-eight.vercel.app/_next/image?url=%2Fafrica.png&w=256&q=75",
              },
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
              },
              defaultChain: optimism,
              supportedChains: [optimism],
              loginMethods: ["email"],
            }}
          >
            {children}
          </PrivyProvider>
        </DataProvider>
      </body>
    </html>
  );
}
