import axiosSlack from '../axiosSlack';
export const getConversationsList = () => {
  const url = '/conversations.list';
  return axiosSlack.get(url);
};
