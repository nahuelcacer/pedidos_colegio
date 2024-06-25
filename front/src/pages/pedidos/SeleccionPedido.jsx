import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClientes } from '../../service/clientes';

const SeleccionPedido = () => {
    const [clientes, setClientes] = useState([]);

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
        <div className='card'>
            <Autocomplete
                options={clientes}
                renderInput={(params) => <TextField {...params} label="Seleccion un cliente" />}
                getOptionLabel={(option) => option.nombre}
            ></Autocomplete>
            <Autocomplete
            renderInput={(params) => <TextField {...params} label="Selecciona un producto"></TextField>}
            ></Autocomplete>
        </div>
    )
}

export default SeleccionPedido