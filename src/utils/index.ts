import { ObjectFirebaseResponse, UserSlack } from '@types';

export const breakpoints = {
  sm: '(max-width:320px)',
  md: '(max-width:768px)',
  lg: '(max-width:960px)',
  xl: '(max-width:1200px)',
  '2xl': '(max-width:1536px)',
};

export const isEmpty = (obj: any) => {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const transformObjectToArrayResponse = <T>(
  data: ObjectFirebaseResponse,
  idKey: string,
): T[] => {
  if (!data) return [];
  return Object.keys(data).reduce((result, currentKey) => {
    const currentObj = data[currentKey as keyof typeof data];
    const updatedObj = Object.assign(currentObj, { [idKey]: currentKey });
    return result.concat(updatedObj as any);
  }, []);
};
export * from './localStorage';
export const transformUserSlackData = (data: any): UserSlack => {
  const {
    'https://slack.com/team_id': teamId,
    'https://slack.com/user_id': userId,
    'https://slack.com/team_name': teamName,
    'https://slack.com/team_domain': teamDomain,
    'https://slack.com/team_image_230': teamImage,
    'https://slack.com/team_image_default': teamImageDefault,
    ...rest
  } = data;
  return { ...rest, userId, teamId, teamDomain, teamImage, teamImageDefault };
};
