import React from 'react'
import useInput from '../../hooks/useInput'
import { addClientes } from '../../service/clientes'
import './main.css'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CardDetalle from '../../component/cards/CardDetalle'

const HandlerButtons = ({ values }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleAddClick = (e) => {
        addClientes(values)
            .then(() => {
                navigate(-1); // Navigate back after successful addition
            })
            .catch((error) => {
                console.error("Error al agregar cliente:", error);
            });
    }

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant='outlined' onClick={handleBackClick}>Volver</Button>
            <Button variant='contained' onClick={handleAddClick}>Agregar</Button>
        </div>
    )
}
const AgregarClientes = () => {
    const { values, onChange } = useInput({})

    return (
        <CardDetalle title={'Agregar Cliente'}>
            <div className='container-inputs'>
                <TextField
                    type="text"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => { onChange(e) }}
                ></TextField>
                <TextField
                    type="text"
                    name="identificacion"
                    label="DNI/CUIT"
                    variant="outlined"
                    onChange={(e) => { onChange(e) }}
                ></TextField>
                <HandlerButtons values={values}></HandlerButtons>
            </div>
        </CardDetalle>
    )
}

export default AgregarClientes