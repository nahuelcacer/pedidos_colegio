import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getClientes } from "../../service/clientes";

const SeleccionPedido = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getClientes()
      .then((res) => {
        setClientes(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, []);
  return (
    <div className="card">
      <Autocomplete
        options={clientes}
        renderInput={(params) => (
          <TextField {...params} label="Seleccion un cliente" />
        )}
        getOptionLabel={(option) => option.nombre}
      ></Autocomplete>
      <Autocomplete
        options={productos}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona un producto"></TextField>
        )}
        getOptionLabel={(option) => option.nombre}

      ></Autocomplete>
    </div>
  );
};

export default SeleccionPedido;
