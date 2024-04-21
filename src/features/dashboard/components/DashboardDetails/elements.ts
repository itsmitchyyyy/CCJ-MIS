import { CardInfo } from '@/components/Elements/CardInfo';
import { colors } from '@/constants/themes';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  gap: 5em;
`;

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const StyledCard = styled(CardInfo)`
  && {
    box-shadow: -2px 3px 9px 0px ${colors.violet.main};
    height: 300px;
    width: 500px;
    background: ${colors.violet.main};
    border: 1px solid ${colors.violet.main};
  }

  .ant-card-head {
    background: ${colors.violet.dark};
    color: ${colors.sysLight.onPrimary};
    border: 1px solid ${colors.violet.dark};
  }
`;

export const StyledText = styled.p`
  font-size: 16px;
`;
