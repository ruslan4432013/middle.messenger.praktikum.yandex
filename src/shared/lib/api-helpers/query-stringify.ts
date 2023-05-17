export const queryStringify = (data: Record<string, (string[] | string | number)>): string => {
  if (typeof data !== 'object') {
    throw new Error('Invalid Input. Only objects and arrays are allowed.');
  }
  const params = new URLSearchParams();
  for (const [key, param] of Object.entries(data)) {
    if (Array.isArray(param)) {
      param.forEach((value) => {
        params.append(key, value);
      });
    } else {
      params.append(key, param.toString());
    }
  }
  return params.toString();
};
