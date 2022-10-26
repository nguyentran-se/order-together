let localStorage: Storage;
if (typeof window !== 'undefined') localStorage = window.localStorage;
export const logOut = () => {
  localStorage.removeItem('stoken');
  localStorage.removeItem('fbtoken');
  document.location.reload();
};
