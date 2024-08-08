import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getClientes } from "../../service/clientes";
import { getProductos } from "../../service/productos";
import { agregarPedidoService } from "../../service/pedidos";
import { toast } from "react-toastify";

const SeleccionPedido = ({ items, setItems, setPedido, pedido }) => {
  const [cliente, setCliente] = useState([]);
  const [producto, setProductos] = useState([]);


  const [cantidad, setCantidad] = useState(null)
  const [productoselecccionado, setProductoSeleccionado] = useState(null)
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [errors, setErrors] = useState({ clienteSeleccionado: false, productoselecccionado: false, cantidad: false });
  // const [items, setItems] = useState([])

  const limpiarAutocomplete = () => {
    setItems([])
    setClienteSeleccionado(null);
    setProductoSeleccionado(null)
    setErrors({ ...errors, clienteSeleccionado: false, productoselecccionado: false });
    toast.info('Campos limpiados' ,{
      position:'bottom-right',
      autoClose:1000
    })
  };


  const validateInputs = () => {
    if (!clienteSeleccionado || !productoselecccionado || !cantidad) {
      setErrors({
        clienteSeleccionado: !clienteSeleccionado,
        productoselecccionado: !productoselecccionado,
        cantidad: !cantidad,
      });
      return false;
    }
    return true;
  };

  const agregarItem = () => {
    if (!validateInputs()) {
      return;
    }
    setItems([...items, { producto: productoselecccionado, cantidad, totalItem: cantidad * productoselecccionado.precio }]);
    console.log('Item agregado:', { producto: productoselecccionado, cantidad });
  };

  const agregarPedido = () => {
    if (!validateInputs()) {
      return;
    }
    agregarPedidoService(pedido)
  };
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {

      // Evitar que se ejecute agregarItem en este caso
      event.preventDefault();
      agregarPedido()

    } else if (event.ctrlKey && event.key === 'Backspace') {
      event.preventDefault();
      limpiarAutocomplete();
    }
    else if (event.key === 'Enter') {
      event.preventDefault(); // Prevenir el envío del formulario si está dentro de un formulario
      agregarItem();

    } };
    useEffect(()=> {
      setPedido({cliente:clienteSeleccionado, pedido:items})
    }, [items, clienteSeleccionado])
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
            
            value={clienteSeleccionado}
            onChange={(event, newValue) => {
              setClienteSeleccionado(newValue);
              setErrors({ ...errors, clienteSeleccionado: false });
            }}
            options={cliente}
            renderInput={(params) => (
              <TextField {...params}
                autoFocus
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
            value={productoselecccionado}
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
              setCantidad(parseInt(event.target.value));
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
