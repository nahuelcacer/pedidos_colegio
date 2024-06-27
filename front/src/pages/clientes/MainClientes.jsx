import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { getClientes } from "../../service/clientes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ReactComponent as PlusIcon } from "../../icons/plus-svgrepo-com.svg";
import TableFooterPaginator from "../../component/tools/TableFooterPaginator";
import FadeMenu from "./MenuClientes";

const MainClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState('')

  const searchParams = new URLSearchParams({
    q: search,
    escribano: false
  })

  useEffect(() => {
    getClientes(searchParams)
      .then((res) => {
        setClientes(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, [search]);




  // PAGINADOR
  const itemsPerPage = 15; // Puedes ajustar la cantidad de elementos por página según tus necesidades
  const totalPages = Math.ceil(clientes.length / itemsPerPage);

  // Estado del paginador
  const [currentPage, setCurrentPage] = useState(1);

  // Función para cambiar la página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calcular los índices de los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const clientesVisibles = clientes.slice(startIndex, endIndex);

  return (
    <div className="card">
      <h1>Clientes</h1>

      <Table size="small">
        <TableHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <Link to={"agregar/"}>
                <Button size="small" variant="contained">
                  <PlusIcon
                    width="24px"
                    height="24px"
                    stroke="#ffffff"
                  ></PlusIcon>
                  agregar
                </Button>
              </Link>
            </div>
            <div>
              <TextField size="small" name="search" onChange={(e) => { setSearch(e.target.value) }}></TextField>
            </div>
          </div>
          <TableRow sx={{ backgroundColor: "#F9FAFB", borderRadius: "15px" }}>
            <TableCell>
              <p className="title_table">NOMBRE</p>
            </TableCell>
            <TableCell>
              <p className="title_table">DNI/CUIT</p>
            </TableCell>
            <TableCell>
              <p className="title_table">CONDICION</p>
            </TableCell>
            <TableCell>
              <p className="title_table">ACCION</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientesVisibles.length > 0 ? clientesVisibles.map((cliente) => (
            <TableRow>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.identificacion}</TableCell>
              <TableCell>
                {cliente.escribano ? (
                  <p className="escribano">Escribano</p>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell>
                <FadeMenu cliente={cliente.identificacion}></FadeMenu>
              </TableCell>
            </TableRow>
          )) : <TableCell colSpan={4}><p style={{textAlign:'center', fontSize:'14px', margin:'10px 0 10px 0'}}>No se encontraron registros</p> </TableCell>}
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
  );
};

export default MainClientes;
