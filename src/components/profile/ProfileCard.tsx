import React from 'react';
import { User, Trophy, Wallet, Calendar } from 'lucide-react';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { formatCurrency, shortenWalletAddress } from '../../utils/mockData';

const ProfileCard: React.FC = () => {
  const { user } = useStore();

  const stats = [
    {
      icon: Calendar,
      label: 'Participations',
      value: user.participationCount,
    },
    {
      icon: Trophy,
      label: 'Wins',
      value: user.winCount,
    },
    {
      icon: Wallet,
      label: 'Total Winnings',
      value: formatCurrency(user.totalWinnings),
      isSpecial: true,
    },
  ];

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
          <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">{user.nickname}</h1>
          
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="text-gray-400 text-sm mr-2">Wallet ID:</span>
            <span className="text-gray-300 text-sm font-mono">{shortenWalletAddress(user.walletId)}</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="text-gray-400 text-sm mr-2">Balance:</span>
            <span className="text-primary font-bold">{formatCurrency(user.balance)}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="bg-background rounded-lg p-3 border border-gray-800 text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <div className={`font-bold text-lg ${stat.isSpecial ? 'text-primary' : 'text-white'}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;