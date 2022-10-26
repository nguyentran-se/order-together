let localStorage: Storage;
//TODO: Remove temporary solution for this case.
if (typeof window !== 'undefined') localStorage = window.localStorage;
export const logOut = () => {
  localStorage.removeItem('stoken');
  localStorage.removeItem('fbtoken');
  document.location.reload();
};
