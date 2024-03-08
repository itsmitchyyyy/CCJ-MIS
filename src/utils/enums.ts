export const getEnumKeysByValue = (myEnum: any, enumValue: any) => {
  const keys = Object.keys(myEnum).filter((key) => myEnum[key] === enumValue);
  return keys.length ? keys[0] : null;
};
