import { Form, Input, Modal } from 'antd';
import { ErrorWrapper, StyledFlex } from './elements';
import { Controller, useForm } from 'react-hook-form';
import { ChangePasswordRequest } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: (data: ChangePasswordRequest) => void;
};

const ChangePasswordModal = ({ open, onCancel, onOk }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onCancel}
      okText="Change"
      onOk={handleSubmit(onOk)}>
      <Form layout="vertical">
        <StyledFlex vertical>
          <ErrorMessage
            name="current_password"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            name="current_password"
            control={control}
            render={({ field }) => (
              <Form.Item label="Current Password" required>
                <Input
                  name="current_password"
                  size="large"
                  value={field.value}
                  onChange={field.onChange}
                  status={errors.current_password && 'error'}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="new_password"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <Form.Item label="New Password" required>
                <Input
                  name="new_password"
                  size="large"
                  value={field.value}
                  onChange={field.onChange}
                  status={errors.new_password && 'error'}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="new_password_confirmation"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            name="new_password_confirmation"
            control={control}
            render={({ field }) => (
              <Form.Item label="New Password Confirmation" required>
                <Input
                  name="new_password_confirmation"
                  size="large"
                  value={field.value}
                  onChange={field.onChange}
                  status={errors.new_password_confirmation && 'error'}
                />
              </Form.Item>
            )}
          />
        </StyledFlex>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
