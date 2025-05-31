import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Draw, Participant, Network, WalletBalance } from '../types';
import { generateMockUser } from '../utils/mockData';
import { TatumService } from '../services/tatum';

interface StoreState {
  user: User;
  currentDraw: Draw;
  drawHistory: Draw[];
  participants: Participant[];
  nextDrawTime: number;
  selectedNetwork: Network;
  walletBalances: WalletBalance[];
  isLoadingBalance: boolean;
  
  // Actions
  joinDraw: () => boolean;
  completeDrawAndSelectWinner: () => void;
  resetDraw: () => void;
  setSelectedNetwork: (network: Network) => void;
  updateBalance: (amount: number) => void;
  createWallet: (network: Network) => Promise<void>;
  refreshBalance: (network: Network) => Promise<void>;
}

const DRAW_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: generateMockUser(),
      currentDraw: {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        participants: [],
        winner: null,
        prize: 0,
        totalPool: 0,
      },
      drawHistory: [],
      participants: [],
      nextDrawTime: Date.now() + DRAW_DURATION,
      selectedNetwork: 'TRC20',
      walletBalances: [],
      isLoadingBalance: false,

      createWallet: async (network: Network) => {
        try {
          const response = await TatumService.createWallet(network);
          set(state => ({
            user: {
              ...state.user,
              wallets: {
                ...state.user.wallets,
                [network]: response.address,
              },
            },
          }));
        } catch (error) {
          console.error('Failed to create wallet:', error);
          throw error;
        }
      },

      refreshBalance: async (network: Network) => {
        const { user } = get();
        const address = user.wallets[network];
        
        if (!address) {
          console.error('No wallet address found for network:', network);
          return;
        }

        set({ isLoadingBalance: true });
        
        try {
          const balance = await TatumService.getBalance(address, network);
          set(state => ({
            walletBalances: [
              ...state.walletBalances.filter(b => b.network !== network),
              balance,
            ],
          }));
        } catch (error) {
          console.error('Failed to refresh balance:', error);
        } finally {
          set({ isLoadingBalance: false });
        }
      },

      joinDraw: () => {
        const { user, participants } = get();
        
        if (user.balance < 1) {
          return false;
        }
        
        if (participants.some(p => p.userId === user.id)) {
          return false;
        }
        
        set(state => ({
          user: {
            ...state.user,
            balance: state.user.balance - 1,
            participationCount: state.user.participationCount + 1,
          },
          participants: [
            ...state.participants,
            {
              userId: state.user.id,
              nickname: state.user.nickname,
              avatarUrl: state.user.avatarUrl,
            }
          ],
          currentDraw: {
            ...state.currentDraw,
            participants: [...state.currentDraw.participants, state.user.id],
            totalPool: state.currentDraw.totalPool + 1,
          }
        }));
        
        return true;
      },
      
      completeDrawAndSelectWinner: () => {
        const { currentDraw, participants, user } = get();
        
        if (participants.length === 0) {
          get().resetDraw();
          return;
        }
        
        const winnerIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[winnerIndex];
        
        // Winner gets 90% of the pool
        const totalPool = currentDraw.totalPool;
        const prize = totalPool * 0.9;
        
        let updatedUser = user;
        if (winner.userId === user.id) {
          updatedUser = {
            ...user,
            balance: user.balance + prize,
            winCount: user.winCount + 1,
            totalWinnings: user.totalWinnings + prize,
          };
        }
        
        const completedDraw = {
          ...currentDraw,
          winner: winner.userId,
          prize,
        };
        
        set(state => ({
          user: updatedUser,
          drawHistory: [completedDraw, ...state.drawHistory].slice(0, 10),
          currentDraw: {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            participants: [],
            winner: null,
            prize: 0,
            totalPool: 0,
          },
          participants: [],
          nextDrawTime: Date.now() + DRAW_DURATION,
        }));
      },
      
      resetDraw: () => {
        set({
          currentDraw: {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            participants: [],
            winner: null,
            prize: 0,
            totalPool: 0,
          },
          participants: [],
          nextDrawTime: Date.now() + DRAW_DURATION,
        });
      },
      
      setSelectedNetwork: (network: Network) => {
        set({ selectedNetwork: network });
      },
      
      updateBalance: (amount: number) => {
        set(state => ({
          user: {
            ...state.user,
            balance: state.user.balance + amount,
          }
        }));
      },
    }),
    {
      name: 'win-win-syndicate-storage',
      partialize: (state) => ({
        user: state.user,
        drawHistory: state.drawHistory,
        walletBalances: state.walletBalances,
      }),
    }
  )
);

export default useStore;