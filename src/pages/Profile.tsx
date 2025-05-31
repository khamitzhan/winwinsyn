import React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import UserDrawHistory from '../components/profile/UserDrawHistory';

const Profile: React.FC = () => {
  return (
    <div>
      <ProfileCard />
      <UserDrawHistory />
    </div>
  );
};

export default Profile;