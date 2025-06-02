import React, { useState } from 'react';

const segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'];

const PrizeDraw: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  // TODO: Реализовать проверку платного подписчика через API Kick
  const isSubscriber = true; // Пока вручную для теста

  const spin = () => {
    if (spinning || !isSubscriber) return;
    setSpinning(true);
    const selectedIndex = Math.floor(Math.random() * segments.length);
    setTimeout(() => {
      setSelected(selectedIndex);
      setSpinning(false);
      alert(`You won: ${segments[selectedIndex]}!`);
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Wheel of Fortune</h2>
      <div style={{ margin: '20px', fontSize: '24px' }}>
        {selected === null ? 'Spin the wheel!' : `Selected prize: ${segments[selected]}`}
      </div>
      <button onClick={spin} disabled={spinning || !isSubscriber} style={{ fontSize: '18px', padding: '10px 20px' }}>
        {isSubscriber ? (spinning ? 'Spinning...' : 'Spin') : 'Only paid subscribers can spin'}
      </button>
    </div>
  );
};

export default PrizeDraw;
