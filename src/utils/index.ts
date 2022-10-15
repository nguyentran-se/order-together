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
export * from './localStorage';
