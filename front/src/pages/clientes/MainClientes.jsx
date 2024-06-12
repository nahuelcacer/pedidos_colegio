import React from 'react'
import { Link } from 'react-router-dom'

const MainClientes = () => {
    return (
        <div>
            MainClientes
            <Link to={'agregar/'}>
            <button>Agregar cliente </button>
            </Link>
        </div>
    )
}

export default MainClientes