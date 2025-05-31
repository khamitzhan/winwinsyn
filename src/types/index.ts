export interface User {
  id: string;
  nickname: string;
  avatarUrl: string;
  balance: number;
  walletId: string;
  network: Network;
  participationCount: number;
  winCount: number;
  totalWinnings: number;
  wallets: {
    [key in Network]: string;
  };
}

export interface Draw {
  id: string;
  timestamp: number;
  participants: string[];
  winner: string | null;
  prize: number;
  totalPool: number;
}

export interface Participant {
  userId: string;
  nickname: string;
  avatarUrl: string;
}

export type Network = 'TRC20' | 'ERC20' | 'SOL';

export interface NetworkInfo {
  name: Network;
  address: string;
  qrCode: string;
  color: string;
}

export interface WalletBalance {
  network: Network;
  balance: string;
}