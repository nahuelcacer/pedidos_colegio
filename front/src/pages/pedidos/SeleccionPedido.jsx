import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getClientes } from "../../service/clientes";
import { getProductos } from "../../service/productos";

const SeleccionPedido = () => {
  const [cliente, setCliente] = useState([]);
  const [producto, setProductos] = useState([]);


  const [cantidad, setCantidad] = useState(null)
  const [productoselecccionado, setProductoSeleccionado] = useState(null)
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [errors, setErrors] = useState({ clienteSeleccionado: false, productoselecccionado: false, cantidad: false });
  const [items, setItems] = useState([])

  const agregarItem = () => {
    if (!clienteSeleccionado || !productoselecccionado || !cantidad) {
      setErrors({
        clienteSeleccionado: !clienteSeleccionado,
        productoselecccionado: !productoselecccionado,
        cantidad: !cantidad,
      });
      return;
    }
    setItems([...items, { producto: productoselecccionado, cantidad }]);
    console.log('Item agregado:', { producto: productoselecccionado, cantidad });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      agregarItem();
    }
  };
  useEffect(() => {
    getClientes()
      .then((res) => {
        setCliente(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });

    getProductos()
      .then((res) => {
        setProductos(res)
      })
  }, []);
  return (
    <div >
      <div>
        <Autocomplete
          onChange={(event, newValue) => {
            setClienteSeleccionado(newValue);
            setErrors({ ...errors, clienteSeleccionado: false });
          }}
          options={cliente}
          renderInput={(params) => (
            <TextField {...params}
              label="Seleccion un cliente"
              onKeyDown={handleKeyPress}
              error={errors.clienteSeleccionado}
              helperText={errors.clienteSeleccionado ? 'El cliente es obligatorio' : ''}
            />
          )}
          getOptionLabel={(option) => option.nombre}
        ></Autocomplete>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', marginTop: '20px', gap: '20px' }}>

        <Autocomplete
          onChange={(event, newValue) => {
            setProductoSeleccionado(newValue);
            setErrors({ ...errors, productoselecccionado: false });
          }}
          key={(option) => option.id || option.nombre}
          options={producto}
          renderInput={(params) => (
            <TextField {...params} 
              label="Selecciona un producto"
              onKeyDown={handleKeyPress}
              error={errors.productoselecccionado}
              helperText={errors.productoselecccionado ? 'El producto es obligatorio' : ''}

            ></TextField>
          )}
          getOptionLabel={(option) => option.nombre}

        ></Autocomplete>


        <TextField
          onChange={(event) => {
            setCantidad(event.target.value);
            setErrors({ ...errors, cantidad: false });
          }}
          placeholder="Cantidad"
          onKeyDown={handleKeyPress}
          error={errors.cantidad}
          helperText={errors.cantidad ? 'Ingrese cantidad' : ''}
          InputProps={{
            style: {
              color: errors.cantidad ? 'red' : 'inherit',
            },
          }}
        >
        </TextField>
      </div>
    </div>
  );
};

export default SeleccionPedido;
