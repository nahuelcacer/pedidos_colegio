import { Autocomplete, IconButton, TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useData } from '../../context/DataContext'
import formatArs from '../../tools/formatArs'
import { usePedido } from '../../context/PedidoContext'
import { ReactComponent as DeleteIcon } from "../../icons/trash-bin-trash-svgrepo-com.svg";

const EditarPedido = () => {
  const { state: stateEdit, dispatch } = usePedido()
  const { clientes } = useData()


  const handleCantidadChange = (e, index) => {
    const nuevaCantidad = parseInt(e.target.value, 10); // Asegúrate de convertir a número

    // setItems(prevItems => {
    //   return prevItems.map((item, idx) => {
    //     if (idx === index) { // Usa el índice para identificar el elemento
    //       console.log(`Cambiando cantidad del item con índice: ${index}`);
    //       return {
    //         ...item,
    //         cantidad: nuevaCantidad,
    //         total_item: item.producto.precio * nuevaCantidad
    //       };
    //     }
    //     return item;
    //   });
    // });
  };

  return (
    <div>
      <h2>Editar pedido</h2>
      <div className='container-inputs'>
        <Autocomplete
          size='small'
          value={stateEdit.editPedido.cliente}
          onChange={(event, newValue) => { dispatch({ type: 'select customer edit', payload: newValue }) }}
          options={clientes}
          getOptionLabel={(option) => option.nombre}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona un cliente"
            />
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
                  type='number' 
                  size="small" 
                  value={item.cantidad} 
                  onChange={(e)=> {dispatch({type: 'add quantity item edit',payload: {index: index, cantidad: e.target.value}})
                  ;}}>

                  </TextField>
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  {formatArs.format(item.total_item)}
                </td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      // handleDelete(index);
                    }}
                  >
                    <DeleteIcon width="18px" height="18px" />
                  </IconButton>
                </td>
              </tr>

            )
          })}
        </table>

      </div>
    </div>
  )
}

export default EditarPedido
