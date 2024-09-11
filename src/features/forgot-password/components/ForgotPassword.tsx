import { Alert, Form, Input } from 'antd';
import {
  ForgotPasswordContainer,
  ForgotPasswordErrorWrapper,
  ForgotPasswordStyledButton,
  ForgotPasswordStyledCard,
} from './elements';
import { Controller, useForm } from 'react-hook-form';
import { forgotPasswordValidationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  onSubmit: (data: { email: string }) => void;
  loading?: boolean;
};

const ForgotPassword = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <ForgotPasswordContainer>
      <div>
        <h1>Reset your password</h1>
      </div>
      <ForgotPasswordStyledCard>
        <Form layout="vertical">
          <Alert
            style={{ marginBottom: '.5em' }}
            message="Enter your user account's verified email address and we will send you a password reset link."
            type="info"
            showIcon
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <ForgotPasswordErrorWrapper>{message}</ForgotPasswordErrorWrapper>
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item required>
                <Input
                  status={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                  size="large"
                  onChange={field.onChange}
                  value={field.value}
                  type="email"
                />
              </Form.Item>
            )}
          />

          <Form.Item>
            <ForgotPasswordStyledButton
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              size="large"
              type="primary"
              htmlType="submit">
              Send Reset Link
            </ForgotPasswordStyledButton>
          </Form.Item>
        </Form>
      </ForgotPasswordStyledCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
