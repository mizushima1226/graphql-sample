type Key = 'token' | 'apollo-cache-persist';

export const getItem = (key: Key): string => (process.browser ? localStorage.getItem(key) || '' : '');

export const setItem = (key: Key, value: string) => process.browser && localStorage.setItem(key, value);

export const removeItem = (key: Key) => process.browser && localStorage.removeItem(key);
