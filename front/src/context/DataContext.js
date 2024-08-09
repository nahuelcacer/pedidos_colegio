import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { getClientes } from '../service/clientes';
import { getProductos } from '../service/productos';



const initialState = {
  cliente:null,
  producto:null,
  cantidad:0
}

function pedidoReducer(state,action){
  switch(action.type){
    case 'select customer':
      return {
        ...state, cliente:action.payload
      }
    case 'select product':
      return {
        ...state, producto:action.payload
      }
    case 'select quantity':
      return {
        ...state, cantidad:action.payload
      }
    case 'restart':
      return initialState
  }
}
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [state, dispatch] = useReducer(pedidoReducer, initialState);

  useEffect(() => {
    fetchClientes();
  }, []);
  useEffect(()=>{
    fetchProductos()    
  }, [])

  const fetchClientes = async () => {
    try {
      const response = await getClientes();
      setClientes(response);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const updateClientes = async () => {
    await fetchClientes();
  };

  const fetchProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response);
    } catch (error) {
      console.error('Error fetchings products', error)
    }
  }

  const updateProductos = async () => {
    await fetchProductos();
  }
  return (
    <DataContext.Provider value={{ clientes, setClientes, updateClientes, productos, updateProductos, state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
