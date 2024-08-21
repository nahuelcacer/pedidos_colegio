export const stackUpdating = async ({ children }) => {
    try {
      // Ejecutar las funciones o código pasado como children
      if (typeof children === 'function') {
        children();
      }
    } catch (err) {
      console.error(err);
    }
  };