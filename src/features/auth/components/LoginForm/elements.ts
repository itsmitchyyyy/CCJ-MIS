import { colors } from '@/constants/themes';
import { Button, Card, Form } from 'antd';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StyledCard = styled(Card)`
  height: 421px;
  width: 314px;
  box-shadow: -2px 1px 9px 0px ${colors.keyColors.grey};
  padding: 3em 0;
`;

export const RememberMeFormItem = styled(Form.Item)`
  .login-form-forgot {
    float: right;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;
