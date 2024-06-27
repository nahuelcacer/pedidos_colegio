import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { detailCliente } from '../../service/clientes'
import { formatDateTime } from '../../tools/formateDate'
import { Button } from '@mui/material'
import { palette } from '../../theme' 

const InfoCliente = ({label, data}) => {
    return (
        <div style={{display:'flex', flexDirection:'row', margin:'10px 0 10px 0'}}>
             <p style={{width: '100px', margin: 0}}>{label}</p> {/* Set the desired width for the label */}
             <p style={{color: palette.text, fontWeight: '400', margin: 0}}>{data}</p>
        </div>
    )
}

const ButtonsHandler = () => {
    const navigate = useNavigate()
    return (
        <div style={{display:'flex', gap:'10px'}}> 
            <Button onClick={() => {navigate(-1)}} style={{ backgroundColor: palette.primary, color: 'white', borderColor: palette.primary }} >Volver</Button>
            <Button variant='contained' color='error' >Eliminar</Button>
        </div>
    )
}
const DetalleCliente = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)


    useEffect(() => {
        detailCliente(id)
            .then((res) => {
                setCliente(res); // Asignar res.data a clientes
            })
            .catch((error) => {
                console.error("Error al obtener clientes:", error);
            });
    }, [])



    return (
        <div className='card'>
            <h2>Cliente</h2>
            <InfoCliente label="Nombre" data={cliente?.nombre}></InfoCliente>
            <InfoCliente label="DNI/CUIT" data={cliente?.identificacion}></InfoCliente>
            <InfoCliente label="Creado" data={formatDateTime(cliente?.created_at)}></InfoCliente>
            <InfoCliente label="Escribano   " data={cliente?.escribano}></InfoCliente>
            <ButtonsHandler></ButtonsHandler>
        </div>
    )
}

export default DetalleCliente