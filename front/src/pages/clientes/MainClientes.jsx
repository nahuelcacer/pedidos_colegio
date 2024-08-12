import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import { getClientes } from "../../service/clientes";
import Paginador from "../../component/paginador/Paginador";
import { Button, TableCell, TableRow } from "@mui/material";
import CardDetalle from "../../component/cards/CardDetalle";
import { useData } from "../../context/DataContext";

const ButtonAdd = () => {
  return (
    <Link to={"agregar/"}>
      <Button variant="contained" color="primary">
        Agregar
      </Button>
    </Link>
  );
};

const ListData = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (cliente) => {
    navigate(cliente.identificacion);
  };
  return (
    <>
      {data.map((cliente) => (
        <TableRow
          id="rowClickleable"
          onClick={() => {
            handleRowClick(cliente);
          }}
        >
          <TableCell>{cliente.nombre}</TableCell>
          <TableCell>{cliente.identificacion}</TableCell>
          <TableCell>
            {cliente.escribano ? <p className="escribano">Escribano</p> : <></>}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
const MainClientes = () => {
  const headers = [
    { nombre: "NOMBRE" },
    { nombre: "PRECIO" },
    { nombre: "ESCRIBANO" },
  ];
  const { clientes } = useData();
  return (
    <CardDetalle title={"Listado de clientes"} width="95%">
      <Paginador data={clientes} headers={headers} buttonAdd={<ButtonAdd />}>
        {(dataVisibles) => <ListData data={dataVisibles} />}
      </Paginador>
    </CardDetalle>
  );
};

export default MainClientes;
