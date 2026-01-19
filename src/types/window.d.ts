// Type declarations for Solana wallet extensions
interface Window {
  solana?: {
    isPhantom?: boolean;
    isSolflare?: boolean;
    publicKey?: {
      toBase58(): string;
    };
    connect(): Promise<{ publicKey: { toBase58(): string } }>;
    disconnect(): Promise<void>;
    signTransaction(transaction: any): Promise<any>;
    signAllTransactions(transactions: any[]): Promise<any[]>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  };
  phantom?: {
    solana?: {
      isPhantom?: boolean;
      publicKey?: {
        toBase58(): string;
      };
      connect(): Promise<{ publicKey: { toBase58(): string } }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: any): Promise<any>;
      signAllTransactions(transactions: any[]): Promise<any[]>;
      signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    };
  };
}

