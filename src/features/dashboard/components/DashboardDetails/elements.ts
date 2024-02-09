import { CardInfo } from '@/components/Elements/CardInfo';
import { colors } from '@/constants/themes';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  gap: 5em;
`;

export const StyledCard = styled(CardInfo)`
  box-shadow: -2px 3px 9px 0px ${colors.keyColors.grey};
  height: 300px;
  width: 500px;
`;

export const StyledText = styled.p`
  font-size: 16px;
`;
