import React from 'react';
import { Card } from 'antd';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  bordered?: boolean;
  actions?: React.ReactNode[];
  isLoading?: boolean;
};

const CardInfo = ({
  children,
  title,
  className,
  bordered,
  actions,
  isLoading,
}: Props) => {
  return (
    <Card
      title={title}
      bordered={bordered}
      loading={isLoading}
      className={className}
      actions={actions}>
      {children}
    </Card>
  );
};

export { CardInfo };
