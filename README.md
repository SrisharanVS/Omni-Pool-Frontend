## Frontend: Next.js + Solana Wallet Connect

This project is a **single Next.js app** (no `apps/` folder) that lets you connect to multiple Solana wallets (Phantom, Solflare, Ledger, etc.) using Solana Wallet Adapter.

### Structure

- `src/app/layout.tsx` – root layout, wraps the app with `SolanaWalletProvider`
- `src/app/page.tsx` – home page; shows a single centered **Connect Wallet** button
- `src/app/providers/SolanaWalletProvider.tsx` – sets up Solana connection + wallet adapters
- `src/app/globals.css` – global styles (Tailwind)
- `src/types/window.d.ts` – TypeScript types for `window.phantom` / `window.solana`

### Tech stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS (v4)
- `@solana/web3.js`
- `@solana/wallet-adapter-react`
- `@solana/wallet-adapter-react-ui`
- `@solana/wallet-adapter-wallets`

### Prerequisites

- Node.js **20+**
- A Solana wallet browser extension (e.g. Phantom, Solflare)

### Run the app

```bash
cd /home/sivasanjeev/proj
npm install
npm run dev
```

Then open `http://localhost:3000` – you’ll see a single centered **Connect Wallet** button.  
Click it to open the wallet modal and connect to Phantom / Solflare / other supported wallets.

