import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { getClientes } from "../../service/clientes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ReactComponent as PlusIcon } from "../../icons/plus-svgrepo-com.svg";

const MainClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes()
      .then((res) => {
        setClientes(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, []);

  return (
    <div className="card">
      <h1>Clientes</h1>

      <Table sx={{ width: "500px" }} size="small">
        <TableHead>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <div>
              <Link to={"agregar/"}>
                <Button size="small" variant="outlined">
                  <PlusIcon
                    width="24px"
                    height="24px"
                    stroke="#1976D2"
                  ></PlusIcon>
                  agregar
                </Button>
              </Link>
            </div>
            <div>
              <TextField size="small"></TextField>
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
          {clientes.map((cliente) => (
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
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="F-More"> <path d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" id="Horizontal"></path> </g> </g> </g></svg>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainClientes;
