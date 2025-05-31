import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { formatCurrency, shortenWalletAddress } from '../../utils/mockData';

const DrawHistory: React.FC = () => {
  const { drawHistory } = useStore();

  return (
    <Card className="mt-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Trophy className="w-5 h-5 text-primary mr-2" />
        Recent Winners
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {drawHistory.map((draw, index) => (
          <motion.div
            key={draw.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-background rounded-lg p-3 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary rounded-full p-2">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">
                    Winner: {shortenWalletAddress(draw.winner || '')}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(draw.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">
                  {formatCurrency(draw.prize)}
                </div>
                <div className="text-xs text-gray-400">
                  {draw.participants.length} participants
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {drawHistory.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No draw history available yet
          </div>
        )}
      </div>
    </Card>
  );
};

export default DrawHistory;