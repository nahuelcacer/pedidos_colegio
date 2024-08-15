import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { getClientes } from '../service/clientes';
import { getProductos } from '../service/productos';


const initialState = {
  cliente:null,
  producto:null,
  cantidad:0,
  editProduct:null
}

function pedidoReducer(state,action){
  switch(action.type){
    case 'select customer':
      return {...state, cliente:action.payload}
    case 'select product':
      return {...state, producto:action.payload}
    case 'select quantity':
      return {...state, cantidad:action.payload}
    case 'restart':
      return initialState
    case 'select producto to edit':
      return {...state, editProduct:action.payload}
    case 'change checkbox product edit':
      return { ...state, editProduct:{...state.editProduct, notarial:action.payload }}
    case 'change product edit':
      return {...state, editProduct: {...state.editProduct, [action.payload.name]: action.payload.value}}
  }
}
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [state, dispatch] = useReducer(pedidoReducer, initialState);
  const [search, setSearch] = useState('')


  const searchParams = new URLSearchParams({
    q: search,
    escribano: false
  })


  useEffect(() => {
    fetchClientes(searchParams);
  }, [search]);
  useEffect(()=>{
    fetchProductos(searchParams)    
  }, [search])

  const fetchClientes = async (searchParams) => {
    try {
      const response = await getClientes(searchParams);
      setClientes(response);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const updateClientes = async () => {
    await fetchClientes();
  };

  const fetchProductos = async (searchParams) => {
    try {
      const response = await getProductos(searchParams);
      setProductos(response);
    } catch (error) {
      console.error('Error fetchings products', error)
    }
  }

  const updateProductos = async () => {
    await fetchProductos();
  }

 
  return (
    <DataContext.Provider value={{ clientes,setSearch, setClientes, updateClientes, productos, updateProductos, state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
