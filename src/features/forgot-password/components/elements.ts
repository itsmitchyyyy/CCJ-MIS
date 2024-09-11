import { colors } from '@/constants/themes';
import { Button, Card } from 'antd';
import styled from 'styled-components';

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ForgotPasswordStyledCard = styled(Card)`
  box-shadow: -2px 1px 9px 0px ${colors.keyColors.grey};
`;

export const ForgotPasswordStyledButton = styled(Button)`
  width: 100%;
`;

export const ForgotPasswordErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;
