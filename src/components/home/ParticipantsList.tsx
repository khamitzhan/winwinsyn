import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Card from '../common/Card';
import useStore from '../../store/useStore';

const ParticipantsList: React.FC = () => {
  const { participants } = useStore();

  return (
    <Card className="mt-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="w-5 h-5 text-primary mr-2" />
        Current Participants
      </h2>
      
      {participants.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {participants.map((participant, index) => (
            <motion.div
              key={participant.userId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="flex flex-col items-center bg-background p-2 rounded-lg border border-gray-800"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={participant.avatarUrl} 
                  alt={participant.nickname}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-1 text-sm font-medium truncate max-w-full">
                {participant.nickname}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No participants yet</p>
          <p className="text-sm mt-1 text-gray-500">Be the first to join!</p>
        </div>
      )}
    </Card>
  );
};

export default ParticipantsList;