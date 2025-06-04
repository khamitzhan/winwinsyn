import React, { useEffect, useState } from 'react';

interface DepositTx {
  txId: string;
  amount: number;
  timestamp: string;
}

const DepositHistory: React.FC = () => {
  const [history, setHistory] = useState<DepositTx[]>([]);

  useEffect(() => {
    const lastDeposit = localStorage.getItem('lastDeposit');
    if (lastDeposit) {
      setHistory([JSON.parse(lastDeposit)]);
    }
  }, []);

  if (history.length === 0) return <p>История депозитов пуста.</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 20 }}>
      <h4>История депозитов</h4>
      <ul>
        {history.map((tx, idx) => (
          <li key={idx}>
            ID транзакции: {tx.txId}, Сумма: {tx.amount} USDT, Время: {tx.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepositHistory;
