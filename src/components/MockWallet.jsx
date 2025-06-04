import React, { useState } from 'react';

const MockWallet = ({ onDeposit }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = () => {
    if (!amount || isNaN(amount)) {
      setMessage('Введите корректную сумму.');
      return;
    }

    // Имитация отправки депозита
    const fakeTx = {
      txId: Math.random().toString(36).substring(2, 10),
      amount: parseFloat(amount),
      timestamp: new Date().toLocaleString(),
    };

    // Можно также отправить в backend или state app
    localStorage.setItem('lastDeposit', JSON.stringify(fakeTx));
    setMessage(`Успешно отправлено ${amount} USDT (фиктивно)`);
    setAmount('');

    if (onDeposit) onDeposit(fakeTx);
  };

  return (
    <div style={{ border: '1px solid #999', padding: 16, marginBottom: 20 }}>
      <h3>💸 Фиктивный Кошелёк</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма в USDT"
      />
      <button onClick={handleDeposit} style={{ marginLeft: 10 }}>
        Отправить депозит
      </button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default MockWallet;
