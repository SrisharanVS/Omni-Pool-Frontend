"use client";

import { WalletModalButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <WalletModalButton className="rounded-xl px-6 py-3 text-base font-semibold">
        Connect Wallet
      </WalletModalButton>
    </main>
  );
}
