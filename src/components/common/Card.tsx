import React from 'react';
import classNames from 'classnames';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'hoverable';
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padded = true,
  ...props
}) => {
  return (
    <div
      className={classNames(
        'rounded-xl bg-background-light',
        {
          'p-4 md:p-6': padded,
          'border border-primary/20': variant === 'bordered',
          'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1': variant === 'hoverable',
        },
        'shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;