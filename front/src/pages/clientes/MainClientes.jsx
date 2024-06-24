import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import { getClientes } from '../../service/clientes';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ReactComponent as PlusIcon } from '../../icons/plus-svgrepo-com.svg';

const MainClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        getClientes()
            .then(res => {
                setClientes(res); // Asignar res.data a clientes
            })
            .catch(error => {
                console.error('Error al obtener clientes:', error);
            });
    }, []);

    return (
        <div className='card'>
            <h1>Clientes</h1>
            
            <Table sx={{width:'400px'}} size='small'>
                <TableHead>
                    <div>
                        <Link to={'agregar/'}>
                            <Button size="small" variant='outlined'><PlusIcon width="24px" height="24px" stroke="#1976D2"></PlusIcon>agregar</Button>
                        </Link>
                    </div>
                    <div>buscador</div>
                    <TableRow sx={{backgroundColor:'#F9FAFB', borderRadius:'15px'}}>
                        <TableCell><p className='title_table'>NOMBRE</p></TableCell>
                        <TableCell><p className='title_table'>DNI/CUIT</p></TableCell>
                        <TableCell><p className='title_table'>CONDICION</p></TableCell>
                        <TableCell><p className='title_table'>ACCION</p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map(cliente => (
                        <TableRow >
                            <TableCell>
                                {cliente.nombre}
                            </TableCell>
                            <TableCell>
                                {cliente.identificacion}
                            </TableCell>
                            <TableCell>
                                {cliente.escribano ? <p className="escribano">Escribano</p> :<></>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default MainClientes;
