import { Checkbox, Form, Input } from 'antd';
import {
  LoginContainer,
  RememberMeFormItem,
  StyledButton,
  StyledCard,
} from './elements';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <StyledCard>
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input size="large" type="text" />
          </Form.Item>
          <Form.Item label="Password">
            <Input size="large" type="password" />
          </Form.Item>
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
              onClick={() => navigate('/dashboard')}
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
