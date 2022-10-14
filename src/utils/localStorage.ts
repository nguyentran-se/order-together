// const localStorage = window.localStorage;

export const getLocalStorage = (key: string) => {
  try {
    let result = localStorage.getItem(key);
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  } catch (error: any) {
    console.error(`[getLocalStorage]: ${error.message}`);
  }
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    let stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
  } catch (error: any) {
    console.error(`[setLocalStorage]: ${error.message}`);
  }
};
