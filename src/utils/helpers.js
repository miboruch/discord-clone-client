export const API_URL = 'http://localhost:9000';

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
