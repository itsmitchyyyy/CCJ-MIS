import { colors } from '@/constants/themes';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
}
`;

export const ImageWrapper = styled.div`
  height: 180px;
  width: 180px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextHeader = styled.div`
  font-size: 18px;
  line-height: 23px;
  font-weight: 700;
  color: ${colors.keyColors.black};
  margin-top: 2em;
`;

export const TextDescription = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${colors.keyColors.black};
  margin-top: 1em;
  text-align: center;
  max-width: 306px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2em;
  max-width: 339px;
`;
