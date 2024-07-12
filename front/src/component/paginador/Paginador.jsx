import React, { useState } from 'react';// Example: import from Material-UI or your own components
import TableFooterPaginator from '../tools/TableFooterPaginator';
import {
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "../../icons/search-svgrepo-com.svg";


const Paginador = ({ children, data, itemsPerPage = 10, headers, title, setSearch, buttonAdd }) => {
    // PAGINADOR
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Estado del paginador
    const [currentPage, setCurrentPage] = useState(1);

    // Función para cambiar la página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Calcular los índices de los elementos a mostrar en la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const dataVisibles = data.slice(startIndex, endIndex);
    const colspan = headers.length
    return (
        <Table>
            <TableHead>
                <TableCell colSpan={colspan}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '25px',
                            },
                        }} size='small' placeholder='Buscar...' onChange={(e) => { setSearch(e.target.value) }} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}></TextField>
                        {buttonAdd && (
                            <div style={{ marginBottom: '16px' }}>
                                {buttonAdd}
                            </div>
                        )}
                    </div>
                </TableCell>

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
    );
};

export default Paginador;
