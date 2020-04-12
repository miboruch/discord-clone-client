export const API_URL = 'http://localhost:9000';

export const getFirstLetter = text => {
  return text.charAt(0);
};

const colors = [
  '#8bc16f',
  '#712a2e',
  '#139ebf',
  '#23703d',
  '#d3c208',
  '#202fc2',
  '#a7a072',
  '#5b745b',
  '#81475c',
  '#bd720e',
  '#405082'
];

export const generateRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
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
