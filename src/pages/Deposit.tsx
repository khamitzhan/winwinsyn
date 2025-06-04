import React from 'react';
import DepositForm from '../components/deposit/DepositForm';
import MockWallet from '../components/MockWallet';

const Deposit: React.FC = () => {
  return (
    <>
      <MockWallet />
      <DepositForm />
    </>
  );
};

export default Deposit;
