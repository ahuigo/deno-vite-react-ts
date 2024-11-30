import { useSyncExternalStore } from 'react';
// Rerfer to: https://github.com/nanxiaobei/resso/blob/main/src/index.ts
type Callback = () => void;
type State = Record<string, unknown>;
type Store<T> = {
  [K in keyof T]: {
    subscribe: (listener: Callback) => Callback;
    getSnapshot: () => T[K];
    useSnapshot: () => T[K];
    setSnapshot: (val: T[K]) => void;
  };
};

const resso = <T extends State>(state: T): Store<T> => {
  if (Object.prototype.toString.call(state) !== '[object Object]') {
    throw new Error('object required');
  }

  const store: Store<T> = {} as Store<T>;

  Object.keys(state).forEach((key: keyof T) => {
    if (typeof state[key] === 'function') return;

    const listeners = new Set<Callback>();

    store[key] = {
      subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      getSnapshot: () => state[key],
      setSnapshot: (val) => {
        if (val === state[key]) return;
        state[key] = val;
        listeners.forEach((listener) => listener());
      },
      useSnapshot: () => {
        return useSyncExternalStore(
          store[key].subscribe,
          store[key].getSnapshot,
        );
      },
    };
  });
  return store;

};

export default resso;
