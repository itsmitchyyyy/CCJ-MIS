import { Modal as AntModal } from 'antd';
import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
};

const Modal = ({
  title = 'Modal Title',
  children,
  open,
  isLoading,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <AntModal
      title={title}
      okText="Save"
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      confirmLoading={isLoading}>
      {children}
    </AntModal>
  );
};

export default Modal;
