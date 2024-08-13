import { Autocomplete, TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useData } from '../../context/DataContext'
import formatArs from '../../tools/formatArs'
import { usePedido } from '../../context/PedidoContext'

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

        {stateEdit.editPedido.items.map((item,index) => {
          return (
            <TableRow id="rowClickleable" key={index} >
              <TableCell>{item?.producto.nombre}</TableCell>
              <TableCell>{formatArs.format(item.producto.precio)}</TableCell>
              <TableCell>
                <TextField
                  type='number'
                  value={item.cantidad}
                  size='small'
                  sx={{ width: '60px' }}
                  // onChange={(e) => {handleCantidadChange(e, index)}}
                />
              </TableCell>
              <TableCell>{formatArs.format(item.total_item)}</TableCell>
            </TableRow>
          )
        })}
      </div>
    </div>
  )
}

export default EditarPedido
