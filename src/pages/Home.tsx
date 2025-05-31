import React, { useEffect } from 'react';
import LiveStream from '../components/common/LiveStream';
import JoinDrawSection from '../components/home/JoinDrawSection';
import ParticipantsList from '../components/home/ParticipantsList';
import DrawHistory from '../components/home/DrawHistory';
import { generateMockParticipants } from '../utils/mockData';
import useStore from '../store/useStore';

const Home: React.FC = () => {
  const store = useStore();
  
  // Add some mock participants for demo purposes
  useEffect(() => {
    if (store.participants.length === 0) {
      const mockParticipants = generateMockParticipants(
        Math.floor(Math.random() * 12) + 3
      );
      
      mockParticipants.forEach(participant => {
        store.currentDraw.participants.push(participant.userId);
        store.currentDraw.totalPool += 1;
      });
      
      useStore.setState({
        participants: mockParticipants,
        currentDraw: {
          ...store.currentDraw,
          participants: store.currentDraw.participants,
          totalPool: store.currentDraw.totalPool,
        }
      });
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveStream />
          <JoinDrawSection />
          <ParticipantsList />
        </div>
        
        <div className="lg:col-span-1">
          <DrawHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;