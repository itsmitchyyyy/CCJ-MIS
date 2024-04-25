import { CardInfo } from '@/components/Elements/CardInfo';
import { colors } from '@/constants/themes';
import { Announcement } from '@/features/announcement/types';
import { List, ListProps } from 'antd';
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
    min-height: 300px;
    width: 500px;
    background: ${colors.violet.main};
    border: 1px solid ${colors.violet.main};
  }

  .ant-card-head {
    background: ${colors.violet.dark};
    color: ${colors.sysLight.onPrimary};
    border: 1px solid ${colors.violet.dark};
  }

  .ant-card-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    background: ${colors.violet.main};
    border: 1px solid ${colors.violet.main};
  }
`;

export const StyledText = styled.p`
  font-size: 16px;
`;

export const StyledList = styled((props: ListProps<Announcement>) => (
  <List {...props} />
))`
  box-shadow: ${colors.keyColors.gainsboro} 10px 10px 10px 10px;
`;
