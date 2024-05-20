import { Modal as AntModal } from 'antd';
import { ModalFooterRender } from 'antd/es/modal/interface';
import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
  footer?: ModalFooterRender | React.ReactNode;
  centered?: boolean;
  okText?: string;
};

const Modal = ({
  title = 'Modal Title',
  children,
  open,
  isLoading,
  onSubmit,
  onCancel,
  footer,
  centered,
  okText = 'Save',
}: Props) => {
  return (
    <AntModal
      centered={centered}
      title={title}
      okText={okText}
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      confirmLoading={isLoading}
      footer={footer}>
      {children}
    </AntModal>
  );
};

export default Modal;
