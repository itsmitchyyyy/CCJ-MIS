// Initial breakpoints based on this article: https://www.hobo-web.co.uk/best-screen-size/
export const breakpoints = {
  desktop: '(min-width: 1280px) and (max-width: 1920px)',
  tablet: '(min-width: 601px) and (max-width: 1280px)',
  mobile: '(min-width: 360px) and (max-width: 601px)',

  // Common breakpoints
  // xl: '(min-width: 1280px) and (max-width: 1920px)',
  // lg: '(min-width: 1024px) and (max-width: 1280px)',
  // md: '(min-width: 768px) and (max-width: 1024px)',

  lg: '(min-width: 768px)',
  md: '(min-width: 576px) and (max-width: 767px)',
  sm: '(min-width: 480px) and (max-width: 575px)',
  xs: '(min-width: 320px) and (max-width: 479px)',
};
