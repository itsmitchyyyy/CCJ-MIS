export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeStringWithSpace = (str: string) => {
  return str
    .split(' ')
    .map((word) => capitalizeString(word))
    .join(' ');
};
