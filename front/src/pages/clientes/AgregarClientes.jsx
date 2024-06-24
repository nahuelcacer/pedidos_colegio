import React, { useEffect } from 'react'
import useInput from '../../hooks/useInput'

const AgregarClientes = () => {
    const { values, onChange } = useInput({})
    useEffect(()=> {
        console.log(values)
    }, [values])
    return (
        <div>
            <h4>Agregar</h4>
            <div>
                <input name="nombre" onChange={(e) => { onChange(e) }}></input>
                <input name="identificacion" onChange={(e) => { onChange(e) }}></input>
                <input name="telefono" onChange={(e) => { onChange(e) }}></input>
                <input name="email" onChange={(e) => { onChange(e) }}></input>
                <button>
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default AgregarClientes