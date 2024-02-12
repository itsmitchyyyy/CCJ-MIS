import { Checkbox, Form, Input } from 'antd';
import {
  LoginContainer,
  RememberMeFormItem,
  StyledAlert,
  StyledButton,
  StyledCard,
} from './elements';
import { LoginFormValues } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { useGlobalState } from '@/hooks/global';

type Props = {
  onSubmit: (data: LoginFormValues) => void;
  loading?: boolean;
};

export const LoginForm = ({ onSubmit, loading }: Props) => {
  const {
    useAuth: { isLoggedInError },
  } = useGlobalState();

  console.log(isLoggedInError);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { username: '', password: '' },
  });

  return (
    <LoginContainer>
      <StyledCard>
        <Form layout="vertical">
          {!!isLoggedInError && (
            <Form.Item>
              <StyledAlert type="error" message={isLoggedInError} />
            </Form.Item>
          )}
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item label="Username" required>
                <Input
                  size="large"
                  onChange={field.onChange}
                  value={field.value}
                  type="text"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item label="Password" required>
                <Input.Password
                  size="large"
                  onChange={field.onChange}
                  value={field.value}
                />
              </Form.Item>
            )}
          />
          <RememberMeFormItem>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Stay Login</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </RememberMeFormItem>
          <Form.Item>
            <StyledButton
              disabled={!(isDirty && isValid) || loading}
              onClick={handleSubmit(onSubmit)}
              size="large"
              type="primary"
              htmlType="submit">
              Login
            </StyledButton>
          </Form.Item>
        </Form>
      </StyledCard>
    </LoginContainer>
  );
};
