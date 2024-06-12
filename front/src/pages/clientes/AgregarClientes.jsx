import React from 'react'
import useInput from '../../hooks/useInput'

const AgregarClientes = () => {
    const { values, onChange } = useInput({})
    return (
        <div>
            <h4>Agregar</h4>
            <div>
                <input name="nombre" onChange={(e) => { onChange(e) }}></input>
                <input name="identificacion" onChange={(e) => { onChange(e) }}></input>
                <input name="telefono" onChange={(e) => { onChange(e) }}></input>
                <input name="email" onChange={(e) => { onChange(e) }}></input>
            </div>
        </div>
    )
}

export default AgregarClientes