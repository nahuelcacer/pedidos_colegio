import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'
import TableFooterPaginator from '../../component/tools/TableFooterPaginator';
import DatePicker from '../../component/tools/DatePicker';

const PaginadorPedidos = ({ children, pedidos, itemsPerPage, headers, setSearch}) => {

    const totalPages = Math.ceil(pedidos.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataVisibles = pedidos.slice(startIndex, endIndex);
    // const colspan = headers.length

    return (
        <div>
            <Table size='small'> 
                <TableHead>
                    <TextField placeholder='Buscar...' size='small' onChange={(e)=>{setSearch(e.target.value)}}></TextField>
                    <DatePicker ></DatePicker>
                </TableHead>
                <TableHead>
                    {headers.map(header => {
                        return (
                            <TableCell sx={{ color: "rgba(64, 135, 241, 0.8)", fontWeight: 600, fontSize: "11px" }}>{header?.nombre}</TableCell>
                        )
                    })}
                </TableHead>
                <TableBody>
                    {children(dataVisibles)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <TableFooterPaginator totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default PaginadorPedidos