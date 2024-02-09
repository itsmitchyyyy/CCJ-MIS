import React from 'react';
import { Card } from 'antd';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

const CardInfo = ({ children, title, className }: Props) => {
  return (
    <Card title={title} className={className}>
      {children}
    </Card>
  );
};

export { CardInfo };
