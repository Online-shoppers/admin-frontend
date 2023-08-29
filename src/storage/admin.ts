const PREFIX = process.env.REACT_APP_PREFFIX || '';

const storage = {
  get: (key: string) => {
    return localStorage.getItem(PREFIX.concat(key));
  },

  set: (key: string, value: unknown) => {
    localStorage.setItem(PREFIX.concat(key), String(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(PREFIX.concat(key));
  },
};

export default storage;
