import stringHash from 'string-hash';

// Función para convertir un hash a un color
const intToRGB = (hash) => {
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - color.length) + color;
};

// Función para obtener un color único para cada usuario
export const getColorForUser = (username) => {
  const hash = stringHash(username);
  return intToRGB(hash);
};

