import React from 'react';
import { ChevronsUp, TrendingDown, Clock } from 'lucide-react';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/mockData';

const UserDrawHistory: React.FC = () => {
  const { drawHistory, user } = useStore();
  
  // Filter draws where the user participated (for a real app, this would come from backend)
  const userDraws = drawHistory.map(draw => ({
    ...draw,
    isWinner: draw.winner === user.id,
    // Simulating if user participated in this draw
    participated: Math.random() > 0.3 || draw.winner === user.id,
  })).filter(draw => draw.participated);

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Your Draw History</h2>
      
      {userDraws.length > 0 ? (
        <div className="space-y-3">
          {userDraws.map((draw) => (
            <div 
              key={draw.id}
              className={`p-3 rounded-lg border ${
                draw.isWinner 
                  ? 'bg-primary/10 border-primary/30' 
                  : 'bg-background border-gray-800'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  draw.isWinner ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-400'
                }`}>
                  {draw.isWinner ? <ChevronsUp className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {draw.isWinner ? 'You won!' : 'Participated'}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(draw.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-400">
                      {draw.participants.length} participants
                    </span>
                    <span className={`text-sm font-medium ${
                      draw.isWinner ? 'text-primary' : 'text-gray-400'
                    }`}>
                      {draw.isWinner ? `+${formatCurrency(draw.prize)}` : '1 USDT entry'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <TrendingDown className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <p>You haven't participated in any draws yet</p>
        </div>
      )}
    </Card>
  );
};

export default UserDrawHistory;