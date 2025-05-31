import axios from 'axios';
import type { Network } from '../types';

// We'll use environment variables in production
const BACKEND_URL = 'https://api.netlify.com/functions';

interface WalletResponse {
  address: string;
  network: Network;
}

interface BalanceResponse {
  balance: string;
  network: Network;
}

export class TatumService {
  private static async callBackend(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) {
    try {
      const response = await axios({
        method,
        url: `${BACKEND_URL}/${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Tatum API Error:', error);
      throw new Error('Failed to process request');
    }
  }

  static async createWallet(network: Network): Promise<WalletResponse> {
    return this.callBackend('create-wallet', 'POST', { network });
  }

  static async getBalance(address: string, network: Network): Promise<BalanceResponse> {
    return this.callBackend('get-balance', 'POST', { address, network });
  }

  static async verifyDeposit(txHash: string, network: Network): Promise<boolean> {
    return this.callBackend('verify-deposit', 'POST', { txHash, network });
  }
}