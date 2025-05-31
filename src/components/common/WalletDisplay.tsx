import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { shortenWalletAddress } from '../../utils/mockData';

interface WalletDisplayProps {
  address: string;
  network: string;
  qrCode: string;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ address, network, qrCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background-light rounded-xl p-4 border border-gray-800"
    >
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold">{network} Address</h3>
        
        <div className="bg-white p-2 rounded-lg">
          <img src={qrCode} alt={`${network} QR Code`} className="w-48 h-48" />
        </div>
        
        <div className="flex w-full items-center justify-between px-2 py-2 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-300">{shortenWalletAddress(address)}</span>
          <Button
            variant="ghost"
            size="sm"
            icon={Copy}
            onClick={handleCopy}
            className="hover:bg-gray-700"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        
        <p className="text-sm text-gray-400 text-center">
          Send USDT ({network}) to this address to deposit funds
        </p>
      </div>
    </motion.div>
  );
};

export default WalletDisplay;