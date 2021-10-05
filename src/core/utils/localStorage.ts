export const setLocalStorage = (key: string, value: unknown): any => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): any => {
  // Get from local storage by key
  const item = window.localStorage.getItem(key);
  // Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : undefined;
};
