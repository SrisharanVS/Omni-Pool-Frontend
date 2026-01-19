"use client";

import React, { useMemo, useEffect, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

export function SolanaWalletProviderRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = "devnet";
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [mounted, setMounted] = useState(false);

  // Ensure we're on the client side before initializing wallets
  useEffect(() => {
    setMounted(true);
  }, []);

  const wallets = useMemo(() => {
    if (!mounted) return [];
    
    const walletAdapters = [];
    
    // Check if Phantom is available before initializing
    // Phantom exposes window.phantom?.solana or window.solana
    const isPhantomAvailable = 
      typeof window !== "undefined" && 
      (window.phantom?.solana?.isPhantom || window.solana?.isPhantom);
    
    // Initialize Phantom first - it should auto-detect
    // But we'll create it regardless, as the adapter handles detection internally
    try {
      const phantomAdapter = new PhantomWalletAdapter();
      walletAdapters.push(phantomAdapter);
      if (isPhantomAvailable) {
        console.log("✅ Phantom wallet detected");
      } else {
        console.log("⚠️ Phantom wallet not detected (extension may not be installed or unlocked)");
      }
    } catch (error) {
      console.warn("Failed to initialize Phantom adapter:", error);
    }
    
    // Initialize Solflare
    try {
      const solflareAdapter = new SolflareWalletAdapter({ network });
      walletAdapters.push(solflareAdapter);
    } catch (error) {
      console.warn("Failed to initialize Solflare adapter:", error);
    }
    
    // Initialize Ledger
    try {
      const ledgerAdapter = new LedgerWalletAdapter();
      walletAdapters.push(ledgerAdapter);
    } catch (error) {
      console.warn("Failed to initialize Ledger adapter:", error);
    }
    
    return walletAdapters;
  }, [network, mounted]);

  // Don't render anything until mounted (avoids WalletModalContext errors)
  if (!mounted) {
    return null;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}


