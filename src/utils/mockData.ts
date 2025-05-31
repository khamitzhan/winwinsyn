import { User, Draw, NetworkInfo } from '../types';

export const generateMockUser = (): User => {
  return {
    id: crypto.randomUUID(),
    nickname: 'CryptoPlayer',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    balance: 100,
    walletId: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    network: 'TRC20',
    participationCount: 35,
    winCount: 3,
    totalWinnings: 128.5,
  };
};

export const generateMockDrawHistory = (count: number): Draw[] => {
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;
  
  return Array.from({ length: count }, (_, i) => {
    const participants = Array.from(
      { length: Math.floor(Math.random() * 15) + 5 },
      () => crypto.randomUUID()
    );
    
    const totalPool = participants.length;
    const winnerIndex = Math.floor(Math.random() * participants.length);
    
    return {
      id: crypto.randomUUID(),
      timestamp: now - (i + 1) * FIVE_MINUTES,
      participants,
      winner: participants[winnerIndex],
      prize: totalPool + (totalPool * 0.1),
      totalPool,
    };
  });
};

export const getNetworkInfo = (): NetworkInfo[] => {
  return [
    {
      name: 'TRC20',
      address: 'TDEovpt1yTF9SqKzjoZqYAFK7BfnCPQs8G',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TDEovpt1yTF9SqKzjoZqYAFK7BfnCPQs8G',
      color: '#FF0000',
    },
    {
      name: 'ERC20',
      address: '0x8247c38b1736370a47394f547b5bd10c1b7fa7d2',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x8247c38b1736370a47394f547b5bd10c1b7fa7d2',
      color: '#3C3C3D',
    },
    {
      name: 'SOL',
      address: '5oVLnJ6uYxpvcHMbjJW9KbundXMcWNS1ANxbpvZjLxF9',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=5oVLnJ6uYxpvcHMbjJW9KbundXMcWNS1ANxbpvZjLxF9',
      color: '#00FFA3',
    },
  ];
};

export const generateMockParticipants = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    userId: crypto.randomUUID(),
    nickname: `Player${i + 1}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  }));
};

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} USDT`;
};

export const shortenWalletAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};