import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Children, useEffect, useState } from 'react'
import { getProductos } from '../../service/productos'
import Paginador from '../../component/paginador/Paginador'
import { Link } from 'react-router-dom'



const ButtonAdd = () => {
    return (
        <Link to={'agregar/'}>
            <Button variant="contained" color="primary">Agregar</Button>
        </Link>
    )
}
const ListData = ({ data }) => (
    <>
        {data.map((producto) => (
            <TableRow key={producto.id}>
                <TableCell>{producto?.nombre}</TableCell>
                <TableCell>{producto?.precio}</TableCell>
                <TableCell>{producto?.notarial}</TableCell>
            </TableRow>
        ))}
    </>
);
const MainProductos = () => {
    const headers = [{ nombre: 'NOMBRE' }, { nombre: 'PRECIO' }, { nombre: 'NOTARIAL' }]
    const [productos, setProductos] = useState([])
    const [search, setSearch] = useState('')

    const searchParams = new URLSearchParams({
        q: search,
        escribano: false
    })

    useEffect(() => {
        getProductos(searchParams)
            .then(res => { setProductos(res) })
    }, [search])
    return (
        <div className='card'>
            <Paginador data={productos} headers={headers} title={"Productos"} setSearch={setSearch} buttonAdd={<ButtonAdd/>}>
                {(dataVisibles) => (
                    <ListData data={dataVisibles} />
                )}
            </Paginador>
        </div>
    )
}

export default MainProductos