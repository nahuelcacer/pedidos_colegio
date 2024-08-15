export const validateFields = (state) => {
    let errors = {};
  
    if (!state.cliente) {
      errors.cliente = 'Client is required';
    }
    if (!state.producto) {
      errors.producto = 'Product is required';
    }
    if (state.cantidad <= 0) {
      errors.cantidad = 'Quantity must be greater than 0';
    }
  
    return errors;
  };
  