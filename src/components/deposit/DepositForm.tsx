import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronsUp, Check } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import WalletDisplay from '../common/WalletDisplay';
import useStore from '../../store/useStore';
import { getNetworkInfo } from '../../utils/mockData';

const DepositForm: React.FC = () => {
  const { selectedNetwork, setSelectedNetwork, updateBalance } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const networkInfo = getNetworkInfo();
  const currentNetwork = networkInfo.find(n => n.name === selectedNetwork) || networkInfo[0];

  const handleDeposit = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      updateBalance(10); // Добавляем 10 USDT к балансу

      // Создаём объект транзакции
      const newTx = {
        txId: Math.random().toString(36).substring(2, 10).toUpperCase(),
        amount: 10,
        timestamp: new Date().toLocaleString(),
      };

      // Получаем текущую историю из localStorage
      const historyStr = localStorage.getItem('depositHistory');
      let history = historyStr ? JSON.parse(historyStr) : [];

      // Добавляем новый депозит в начало массива
      history.unshift(newTx);

      // Оставляем максимум 20 записей
      if (history.length > 20) {
        history = history.slice(0, 20);
      }

      // Сохраняем обратно
      localStorage.setItem('depositHistory', JSON.stringify(history));

      setIsProcessing(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <Wallet className="w-6 h-6 text-primary mr-2" />
        <h1 className="text-2xl font-bold">Deposit USDT</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-400 mb-4">
          Select your preferred network to make a deposit. After sending, click "I Deposited" to simulate the transaction.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {networkInfo.map((network) => (
            <button
              key={network.name}
              onClick={() => setSelectedNetwork(network.name)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedNetwork === network.name
                  ? 'bg-background border-2 border-primary text-primary'
                  : 'bg-background-light text-gray-400 hover:bg-gray-800'
              }`}
            >
              <span style={{ color: network.color }} className="block font-bold mb-1">
                {network.name}
              </span>
              <span className="text-xs">USDT</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <WalletDisplay 
          address={currentNetwork.address}
          network={currentNetwork.name}
          qrCode={currentNetwork.qrCode}
        />
        
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Complete Your Deposit</h3>
            <p className="text-sm text-gray-400 mb-4">
              1. Send USDT to the address shown<br />
              2. Click the button below once sent<br />
              3. Your balance will update automatically
            </p>
          </div>
          
          <div className="mt-4">
            <Button
              onClick={handleDeposit}
              disabled={isProcessing}
              variant="primary"
              fullWidth
              size="lg"
              icon={showSuccess ? Check : ChevronsUp}
            >
              {isProcessing ? 'Processing...' : showSuccess ? 'Deposit Complete!' : 'I Deposited (Add 10 USDT)'}
            </Button>
            
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-success/20 text-success rounded-lg text-center"
              >
                Successfully added 10 USDT to your balance!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DepositForm;


