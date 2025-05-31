import { Handler } from '@netlify/functions';
import { TatumSDK, Network, Ethereum, Tron, Solana } from '@tatum/js';

const API_KEY = process.env.TATUM_API_KEY;

if (!API_KEY) {
  throw new Error('TATUM_API_KEY is not set');
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { address, network } = JSON.parse(event.body || '{}');
    
    let tatum;
    switch (network) {
      case 'TRC20':
        tatum = await TatumSDK.init<Tron>({
          network: Network.TRON,
          apiKey: API_KEY,
        });
        break;
      case 'ERC20':
        tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM,
          apiKey: API_KEY,
        });
        break;
      case 'SOL':
        tatum = await TatumSDK.init<Solana>({
          network: Network.SOLANA,
          apiKey: API_KEY,
        });
        break;
      default:
        throw new Error('Invalid network');
    }

    const balance = await tatum.token.getBalance({
      address,
      tokenAddress: process.env[`${network}_USDT_CONTRACT`] || '',
    });

    await tatum.destroy();

    return {
      statusCode: 200,
      body: JSON.stringify({
        balance: balance.toString(),
        network,
      }),
    };
  } catch (error) {
    console.error('Error getting balance:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get balance' }),
    };
  }
};

export { handler };