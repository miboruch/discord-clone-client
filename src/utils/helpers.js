export const API_URL = 'https://discord-backend.herokuapp.com';
// export const API_URL = 'http://localhost:9000';

export const getFirstLetter = text => {
  return text.charAt(0);
};

export const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
};

export const isObjectEmpty = obj => {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};
