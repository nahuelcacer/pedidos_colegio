import { useState, useCallback } from 'react';

// Custom hook
const useItemsOrder = () => {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item) => {
    setItems((prevItems) => [...prevItems, { ...item, total: item.quantity * item.price }]);
  }, []);

  const deleteItem = useCallback((index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  return { items, addItem, deleteItem };
};

export default useItemsOrder;
