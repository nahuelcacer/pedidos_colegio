import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { useData } from "../../context/DataContext";
import formatArs from "../../tools/formatArs";
import { usePedido } from "../../context/PedidoContext";
import { ReactComponent as DeleteIcon } from "../../icons/trash-bin-trash-svgrepo-com.svg";
import { eliminarPedido } from "../../service/pedidos";

const EditarPedido = ({setOpen}) => {
  const { state: stateEdit, dispatch, updatePedidos } = usePedido();
  const { clientes } = useData();

  const borrarPedido = async (id) => {
    try {
      await eliminarPedido(id)
      updatePedidos()
      setOpen(false)

    }
    catch (error) {
      console.error('Error al eliminar pedido:', error);
    }
  }


  return (
    <div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h2>Editar pedido</h2>
        <Button variant="contained" color='error' onClick={(e)=>{borrarPedido(stateEdit.editPedido.id)}}>Eliminar</Button>
      </div>
      <div className="container-inputs">
        <Autocomplete
          size="small"
          value={stateEdit.editPedido.cliente}
          onChange={(event, newValue) => {
            dispatch({ type: "select customer edit", payload: newValue });
          }}
          options={clientes}
          getOptionLabel={(option) => option.nombre}
          renderInput={(params) => (
            <TextField {...params} label="Selecciona un cliente" />
          )}
        />
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Cantidad</th>
              <th>Total item</th>
            </tr>
          </thead>
          {stateEdit.editPedido.items.map((item, index) => {
            return (
              <tr key={item.producto.id}>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  {item.producto.nombre}
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  {formatArs.format(item.producto.precio)}
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  <TextField
                    type="number"
                    size="small"
                    value={item.cantidad}
                    onChange={(e) => {
                      dispatch({
                        type: "add quantity item edit",
                        payload: { index: index, cantidad: parseInt(e.target.value,10) },
                      });
                    }}
                  ></TextField>
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  {formatArs.format(item.total_item)}
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      dispatch({type:'delete item edit', payload:index})
                    }}
                  >
                    <DeleteIcon width="18px" height="18px" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default EditarPedido;
