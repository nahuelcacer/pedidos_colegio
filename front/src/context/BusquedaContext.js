// BusquedaContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const BusquedaContext = createContext();

export const useBusqueda = () => useContext(BusquedaContext);

export const BusquedaProvider = ({ children }) => {
    const hoy = new Date()

    const [search, setSearch] = useState('');
    const [fecha , setFecha] = useState(hoy.toISOString().slice(0, 10),)

  return (
    <BusquedaContext.Provider value={{ search, setSearch, fecha, setFecha }}>
      {children}
    </BusquedaContext.Provider>
  );
};
