import {
  Button,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import Paginador from "../../component/paginador/Paginador";
import { Link, useNavigate } from "react-router-dom";
import CardDetalle from "../../component/cards/CardDetalle";
import { useData } from "../../context/DataContext";
import formatArs from "../../tools/formatArs";

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

  const handleRowClick = (producto) => {
    const iden = producto.id;
    navigate(`/productos/${iden}`);
  };
  return (
    <>
      {data.map((producto) => (
        <TableRow
          id="rowClickleable"
          onClick={() => {
            handleRowClick(producto);
          }}
        >
          <TableCell>{producto?.nombre}</TableCell>
          <TableCell>{formatArs.format(producto?.precio)}</TableCell>
          <TableCell>{producto?.notarial ? <>Notarial</>: <></>}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
const MainProductos = () => {
  const headers = [
    { nombre: "NOMBRE" },
    { nombre: "PRECIO" },
    { nombre: "NOTARIAL" },
  ];
  const { productos } = useData();

  return (
    <CardDetalle title={"Listado de productos"} width="95%">
      <Paginador
        data={productos}
        headers={headers}
        title={"Productos"}
        buttonAdd={<ButtonAdd />}
      >
        {(dataVisibles) => <ListData data={dataVisibles} />}
      </Paginador>
    </CardDetalle>
  );
};

export default MainProductos;
