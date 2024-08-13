import {
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import TableFooterPaginator from "../../component/tools/TableFooterPaginator";
import { usePedido } from "../../context/PedidoContext";
import { AndroidSwitch } from "../../component/switch/AndroidSwitch";

const PaginadorPedidos = ({ children, pedidos=[], itemsPerPage, headers }) => {
  const { handleSearch } = usePedido()
  const totalPages = pedidos ? Math.ceil(pedidos.length / itemsPerPage) : 0;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataVisibles = pedidos ? pedidos.slice(startIndex, endIndex) : 0;
  // const colspan = headers.length

  return (
    <div>
      <Table size="small">
      <TableHead>
          <TableRow>
            <TableCell colSpan={headers.length} >
              <TextField
                placeholder="Buscar..."
                size="small"
                name='q'
                onChange={(e) => handleSearch(e)}
                sx={{ marginRight: 1 }}
              />
            </TableCell>
            
          </TableRow>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header.nombre}
                sx={{
                  color: "rgba(64, 135, 241, 0.8)",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                {header.nombre}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children(dataVisibles)}</TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <TableFooterPaginator
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default PaginadorPedidos;
