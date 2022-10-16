import { ObjectFirebaseResponse } from '@types';

export const breakpoints = {
  sm: '(max-width:320px)',
  md: '(max-width:768px)',
  lg: '(max-width:960px)',
  xl: '(max-width:1200px)',
  '2xl': '(max-width:1536px)',
};

export const isEmpty = (obj: any) => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const transformObjectToArrayResponse = <T>(
  data: ObjectFirebaseResponse,
  idKey: string,
): T[] => {
  return Object.keys(data).reduce((result, currentKey) => {
    const currentObj = data[currentKey as keyof typeof data];
    const updatedObj = Object.assign(currentObj, { [idKey]: currentKey });
    return result.concat(updatedObj as any);
  }, []);
};
export * from './localStorage';
