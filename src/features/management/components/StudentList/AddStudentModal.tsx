import { Modal } from 'antd';
import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
};

export const AddStudentModal = ({
  title = 'Add Student',
  children,
  open,
  isLoading,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <Modal
      title={title}
      okText="Save"
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      confirmLoading={isLoading}>
      {children}
    </Modal>
  );
};
