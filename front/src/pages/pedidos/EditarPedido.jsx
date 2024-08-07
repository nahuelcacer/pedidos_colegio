import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { getClientes } from '../../service/clientes'
import { useData } from '../../context/DataContext'

const EditarPedido = ({ pedido }) => {
    const { clientes } = useData()
    return (
        <div>
            <Autocomplete
                value={pedido?.cliente.nombre}
                options={clientes}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un cliente"
                  />
                )}
            ></Autocomplete>
            <TextField value={pedido.cliente?.identificacion | ''}></TextField>
            <TextField value={pedido.cliente?.nombre | ''}></TextField>
        </div>
    )
}

export default EditarPedido