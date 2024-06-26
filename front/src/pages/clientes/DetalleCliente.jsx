import React from 'react'
import { useParams } from 'react-router-dom'

const DetalleCliente = () => {
    const { id } = useParams()
    return (
        <div className='card'>DetalleCliente {id}</div>
    )
}

export default DetalleCliente