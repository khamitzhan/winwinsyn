import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import CountdownTimer from '../common/CountdownTimer';
import useStore from '../../store/useStore';

const JoinDrawSection: React.FC = () => {
  const { joinDraw, user, participants } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinDraw = () => {
    if (user.balance < 1) {
      setError("Insufficient balance. Please deposit more USDT.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (participants.some(p => p.userId === user.id)) {
      setError("You've already joined this draw.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    const result = joinDraw();
    if (result) {
      setSuccess("Successfully joined the draw!");
      setIsJoined(true);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDrawComplete = () => {
    setIsJoined(false);
  };

  return (
    <Card className="mt-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/10 to-primary-dark/5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-gold text-transparent bg-clip-text">Current Giveaway</h2>
          <p className="text-gray-400 mt-1">Join with 1 USDT to participate</p>
        </div>
        
        <CountdownTimer className="my-6" onComplete={handleDrawComplete} />
        
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleJoinDraw}
            disabled={isJoined || user.balance < 1}
            variant={isJoined ? "outline" : "primary"}
            size="lg"
            icon={ChevronRight}
            iconPosition="right"
            className="transition-all duration-300"
          >
            {isJoined ? "Already Joined" : "Join Draw (1 USDT)"}
          </Button>
        </div>
        
        <div className="mt-6 flex justify-between text-sm">
          <div className="text-gray-400">
            Participants: <span className="text-white font-medium">{participants.length}</span>
          </div>
          <div className="text-gray-400">
            Pool Size: <span className="text-primary font-medium">{participants.length} USDT</span>
          </div>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-error/20 text-error rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-success/20 text-success rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default JoinDrawSection;