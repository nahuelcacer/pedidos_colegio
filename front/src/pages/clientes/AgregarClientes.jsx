import React from 'react'
import useInput from '../../hooks/useInput'
import { addClientes } from '../../service/clientes'
import './main.css'
import { Button, TextField } from '@mui/material'
const AgregarClientes = () => {
    const { values, onChange } = useInput({})


    return (
        <div className='card agregarcliente'>
            <h4>Agregar</h4>
            <div className='container-inputs'>
                <TextField
                 type="text"
                 name="nombre"
                 label="Nombre"
                 variant="outlined"
                 onChange={(e)=>{onChange(e)}}
                ></TextField>
                <TextField
                 type="text"
                 name="identificacion"
                 label="DNI/CUIT"
                 variant="outlined"
                 onChange={(e)=>{onChange(e)}}
                ></TextField>

                {/* <input name="nombre" onChange={(e) => { onChange(e) }}></input>
                <input name="identificacion" onChange={(e) => { onChange(e) }}></input>
                <input name="telefono" onChange={(e) => { onChange(e) }}></input>
                <input name="email" onChange={(e) => { onChange(e) }}></input> */}
                <Button variant='outlined' onClick={(e) => { addClientes(values) }}>Agregar</Button>
            </div>
        </div>
    )
}

export default AgregarClientes