export const omit = <T>(obj: T, keys: (keyof T)[]): Partial<T> => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};
