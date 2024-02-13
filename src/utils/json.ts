const snakeToCamel = (str: string) => {
  return str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
};

const convertJsonToCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => convertJsonToCamelCase(item));
  } else if (data !== null && typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        [snakeToCamel(key)]: convertJsonToCamelCase(data[key]),
      };
    }, {});
  }
  return data;
};

export { convertJsonToCamelCase, snakeToCamel };
