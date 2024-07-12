import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import { getClientes } from "../../service/clientes";
import Paginador from "../../component/paginador/Paginador";
import { Button, TableCell, TableRow } from "@mui/material";


const ButtonAdd = () => {
  return (
    <Link to={'agregar/'}>
      <Button variant="contained" color="primary">Agregar</Button>
    </Link>
  )
}

const ListData = ({ data }) => {
  const navigate = useNavigate()

  const handleRowClick = (cliente) => {
    navigate(cliente.identificacion)
  }
  return (

    <>
      {data.map((cliente) => (
        <TableRow id="rowClickleable" style={{ cursor: 'pointer' }} onClick={() => { handleRowClick(cliente) }}>
          <TableCell>{cliente.nombre}</TableCell>
          <TableCell>{cliente.identificacion}</TableCell>
          <TableCell>
            {cliente.escribano ? (
              <p className="escribano">Escribano</p>
            ) : (
              <></>
            )}
          </TableCell>
        </TableRow>

      ))
      }

    </>
  )
}
const MainClientes = () => {
  const headers = [{ nombre: 'NOMBRE' }, { nombre: 'PRECIO' }, { nombre: 'NOTARIAL' }]


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



  return (
    <div className="card">
      <Paginador data={clientes} headers={headers} setSearch={setSearch} title={'Clientes'} buttonAdd={<ButtonAdd />}>
        {(dataVisibles) => (
          <ListData data={dataVisibles} />
        )}
      </Paginador>
    </div>
  );
};

export default MainClientes;
