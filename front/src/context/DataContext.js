import React, { createContext, useState, useContext, useEffect } from 'react';
import { getClientes } from '../service/clientes';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
    console.log(clientes, 'XONTEX')
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await getClientes();
      console.log(response,'RESPOS')
      setClientes(response);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClientes([]); // Optionally, handle the error state by setting an empty array or any fallback data
    }
  };

  const updateClientes = async () => {
    await fetchClientes();
  };

  return (
    <DataContext.Provider value={{ clientes, setClientes, updateClientes }}>
      {children}
    </DataContext.Provider>
  );
};
