import { css } from 'styled-components';

export const typography = {
  display: {
    large: css`
      font-size: 57px;
      font-style: normal;
      font-weight: 400;
      line-height: 64px;
      letter-spacing: -0.25px;
    `,
    medium: css`
      font-size: 45px;
      font-style: normal;
      font-weight: 400;
      line-height: 52px;
    `,
    small: css`
      font-size: 36px;
      font-style: normal;
      font-weight: 400;
      line-height: 44px;
    `,
  },
  headline: {
    large: css`
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px;
    `,
    medium: css`
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px;
    `,
    small: css`
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
    `,
  },
  title: {
    large: css`
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
    `,
    medium: css`
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
    `,
    small: css`
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
    `,
  },
  label: {
    large: css`
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.9px;
    `,
    medium: css`
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.5px;
    `,
    small: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
    `,
  },
  body: {
    large: css`
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.5px;
    `,
    medium: css`
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 0.9px;
    `,
    small: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.7px;
    `,
    tiny: css`
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.33px;
    `,
    micro: css`
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 14.48px;
    `,
  },
};
