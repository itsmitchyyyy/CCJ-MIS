import React from 'react';
import { Card } from 'antd';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  bordered?: boolean;
};

const CardInfo = ({ children, title, className, bordered }: Props) => {
  return (
    <Card title={title} bordered={bordered} className={className}>
      {children}
    </Card>
  );
};

export { CardInfo };
