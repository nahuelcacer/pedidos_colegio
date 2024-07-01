import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailCliente } from "../../service/clientes";
import { formatDateTime } from "../../tools/formateDate";
import { Button } from "@mui/material";
import { palette } from "../../theme";

const EditCliente = ({ label, data, name }) => {
  const [inputValue, setInputValue] = useState(data);

  useEffect(() => {
    setInputValue(data);
  }, [data]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}
    >
      <p style={{ width: "100px", margin: 0 }}>{label}</p>
      <input value={inputValue} name={name} onChange={handleChange}></input>
    </div>
  );
};

const InfoCliente = ({ label, data }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", margin: "10px 0 10px 0" }}
    >
      <p style={{ width: "100px", margin: 0 }}>{label}</p>{" "}
      {/* Set the desired width for the label */}
      <p style={{ color: palette.text, fontWeight: "400", margin: 0 }}>
        {data}
      </p>
    </div>
  );
};

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
      <Button type="submit">Guardar</Button>
      <Button variant="contained" color="error">
        Eliminar
      </Button>
    </div>
  );
};
const DetalleCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    detailCliente(id)
      .then((res) => {
        setCliente(res); // Asignar res.data a clientes
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, []);

  return (
    <div className="card">
      <h2>Cliente</h2>
      <form>
        <EditCliente
          label="Nombre"
          data={cliente?.nombre}
          name="nombre"
        ></EditCliente>
        <EditCliente
          label="DNI/CUIT"
          data={cliente?.identificacion}
          nombre="identificacion"
        ></EditCliente>
        <InfoCliente
          label="Creado"
          data={formatDateTime(cliente?.created_at)}
        ></InfoCliente>
        <InfoCliente
          label="Escribano   "
          data={cliente?.escribano}
        ></InfoCliente>
        <ButtonsHandler></ButtonsHandler>
      </form>
    </div>
  );
};

export default DetalleCliente;
