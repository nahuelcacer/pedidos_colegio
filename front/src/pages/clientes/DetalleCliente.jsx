import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailCliente, updateCliente } from "../../service/clientes";
import { formatDateTime } from "../../tools/formateDate";
import { Button } from "@mui/material";
import { palette } from "../../theme";

const ButtonsHandler = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        style={{
          backgroundColor: palette.primary,
          color: "white",
          borderColor: palette.primary,
        }}
      >
        Volver
      </Button>
      {/* <Button type="submit">Guardar</Button> */}
      <Button variant="contained" color="error">
        Eliminar
      </Button>
    </div>
  );
};

const DetalleCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    detailCliente(id)
      .then((res) => {
        setCliente(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setCliente({ ...cliente, [name]: value })
  }
  return (
    <div className="card">
      <h2>Cliente</h2>

      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}>
        <p style={{ width: "100px", margin: 0 }}>Nombre</p>
        <input name='nombre' value={cliente.nombre} onChange={(e) => { handleChange(e) }}></input>
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}>
        <p style={{ width: "100px", margin: 0 }}>DNI/CUIT</p>
        <input name='identificacion' value={cliente.identificacion} onChange={(e) => { handleChange(e) }}></input>
      </div>

      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}>
        <p style={{ width: "100px", margin: 0 }}>Escribano </p>

        <select name="escribano" value={cliente.escribano} onChange={handleChange}>
          <option value={true}>SI</option>
          <option value={false}>NO</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}>
        <p style={{ width: "100px", margin: 0 }}>Fecha</p>
        <p style={{ color: palette.text, fontWeight: "400", margin: 0 }}>{formatDateTime(cliente.created_at)}</p>
      </div>

      <Button variant="contained" onClick={(e)=>{updateCliente(id,cliente)}}>Guardar</Button>
    </div>
  );
};

export default DetalleCliente;
