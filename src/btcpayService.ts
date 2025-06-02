import axios from 'axios';

const BTCPAY_API_URL = 'https://mainnet.demo.btcpayserver.org/api'; // пока используем demo
const API_KEY = '3216cca8850c3033f92868a48960cf91cd34aa46'; // твой demo-ключ

export class BtcpayService {
  static async createInvoice(amount: number, currency: string = 'USD') {
    try {
      const response = await axios.post(
        `${BTCPAY_API_URL}/stores/YOUR_STORE_ID/invoices`, // замени YOUR_STORE_ID на ID магазина
        {
          amount: amount.toString(),
          currency,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('BTCPay API Error:', error);
      throw error;
    }
  }
}
