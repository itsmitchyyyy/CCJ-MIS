import { colors } from '@/constants/themes';
import { Flex } from 'antd';
import styled from 'styled-components';

export const StyledFlex = styled(Flex)`
  width: 100%;
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;
