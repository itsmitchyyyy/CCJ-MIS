import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/themes';

const l1 = keyframes`
    to {
        clip-path: inset(0 -12.5% 0 0);
    }
`;

export const Loading = styled.div`
  width: 135px;
  aspect-ratio: 9;
  background: radial-gradient(
      circle closest-side,
      ${colors.keyColors.black} 90%,
      ${colors.keyColors.black02}
    )
    0 / calc(100% / 8) 80% space;
  clip-path: inset(0 100% 0 0);
  animation: ${l1} 1.5s steps(9) infinite;
`;

export const LogoWrapper = styled.div``;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
