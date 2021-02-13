type Key = 'token' | 'apollo-cache-persist';

const isClientSide = typeof window !== 'undefined';

export const getItem = (key: Key): string => (isClientSide ? localStorage.getItem(key) || '' : '');

export const setItem = (key: Key, value: string) => isClientSide && localStorage.setItem(key, value);

export const removeItem = (key: Key) => isClientSide && localStorage.removeItem(key);
