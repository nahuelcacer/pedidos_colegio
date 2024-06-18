import React from 'react'
import { Link } from 'react-router-dom'

const MainClientes = () => {
    return (
        <div className='root_nav'>
            MainClientes
            <Link to={'agregar/'}>
            <button>Agregar cliente </button>
            </Link>
        </div>
    )
}

export default MainClientes