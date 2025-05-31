import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import useStore from '../../store/useStore';

interface CountdownTimerProps {
  className?: string;
  onComplete?: () => void;
}

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ className, onComplete }) => {
  const { nextDrawTime, completeDrawAndSelectWinner } = useStore();
  const [key, setKey] = useState(0);

  // Reset countdown when nextDrawTime changes
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [nextDrawTime]);

  const handleComplete = () => {
    completeDrawAndSelectWinner();
    if (onComplete) {
      onComplete();
    }
  };

  // Renderer for the countdown
  const renderer = ({ minutes, seconds, completed }: { 
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <div className="text-primary font-semibold">Draw in progress...</div>;
    }

    const timeUnits: TimeUnit[] = [
      { value: minutes, label: 'min' },
      { value: seconds, label: 'sec' },
    ];

    return (
      <div className="flex items-center justify-center space-x-2">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <motion.div
                key={`${index}-${unit.value}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-light rounded-lg px-3 py-2 w-16 text-center"
              >
                <span className="text-2xl font-bold text-primary">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </motion.div>
              <span className="text-xs text-gray-400 mt-1">{unit.label}</span>
            </div>
            
            {index < timeUnits.length - 1 && (
              <span className="text-2xl font-bold text-primary mb-4">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className={classNames('text-center', className)}>
      <h3 className="text-lg font-semibold mb-2">Next Draw In</h3>
      <Countdown
        key={key}
        date={nextDrawTime}
        renderer={renderer}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default CountdownTimer;