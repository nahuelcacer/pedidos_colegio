import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { agregarPedidoService } from "../../service/pedidos";
import { toast } from "react-toastify";
import { usePedido } from "../../context/PedidoContext";
import { useData } from "../../context/DataContext";

const SeleccionPedido = () => {
  const { state, dispatch, updatePedidos } = usePedido();
  const { productos, clientes } = useData();
  const [errors, setErrors] = useState({
    clienteSeleccionado: false,
    productoselecccionado: false,
    cantidad: false,
  });

  const validateInputs = () => {
    if (!state.cliente || !state.producto || !state.cantidad) {
      setErrors({
        clienteSeleccionado: state.cliente ? false : true,
        productoselecccionado: state.producto ? false : true,
        cantidad: state.cantidad ? false : true,
      });
      return false;
    }
    return true;
  };

  const agregarItem = () => {
    if (!validateInputs()) {
      return;
    }
    const newItem = {
      producto: state.producto,
      cantidad: state.cantidad,
      totalItem: state.cantidad * state.producto.precio,
    };
    dispatch({ type: "add item", payload: newItem });
  };

  const agregarPedido = async () => {
    if (!validateInputs()) {
        return;
    }
    try {
        await agregarPedidoService({ cliente: state.cliente, pedido: state.items });
        updatePedidos();
    } catch (error) {
        console.error('Error al agregar pedido:', error);
    }
};
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      // Evitar que se ejecute agregarItem en este caso
      event.preventDefault();
      agregarPedido();
    } else if (event.ctrlKey && event.key === "Backspace") {
      event.preventDefault();

      dispatch({ type: "restart" });
      toast.info("Campos limpiados", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } else if (event.key === "Enter") {
      event.preventDefault(); // Prevenir el envío del formulario si está dentro de un formulario
      agregarItem();
    }
  };

  return (
    <div>
      <div>
        <Autocomplete
          value={state.cliente}
          onChange={(event, newValue) => {
            dispatch({ type: "select customer", payload: newValue });
            setErrors({ ...errors, clienteSeleccionado: false });
          }}
          options={clientes}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              label="Seleccion un cliente"
              onKeyDown={handleKeyPress}
              error={errors.clienteSeleccionado}
              helperText={
                errors.clienteSeleccionado ? "El cliente es obligatorio" : ""
              }
            />
          )}
          getOptionLabel={(option) => option.nombre}
        ></Autocomplete>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <Autocomplete
          value={state.producto}
          onChange={(event, newValue) => {
            dispatch({ type: "select product", payload: newValue });
            setErrors({ ...errors, productoselecccionado: false });
          }}
          key={(option) => option.id || option.nombre}
          options={productos}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona un producto"
              onKeyDown={handleKeyPress}
              error={errors.productoselecccionado}
              helperText={
                errors.productoselecccionado ? "El producto es obligatorio" : ""
              }
            ></TextField>
          )}
          getOptionLabel={(option) => option.nombre}
        ></Autocomplete>

        <TextField
          onChange={(event) => {
            dispatch({ type: "select quantity", payload: event.target.value });
            setErrors({ ...errors, cantidad: false });
          }}
          value={state.cantidad}
          placeholder="Cantidad"
          onKeyDown={handleKeyPress}
          error={errors.cantidad}
          helperText={errors.cantidad ? "Ingrese cantidad" : ""}
          InputProps={{
            style: {
              color: errors.cantidad ? "red" : "inherit",
            },
          }}
        ></TextField>
      </div>
    </div>
  );
};

export default SeleccionPedido;
