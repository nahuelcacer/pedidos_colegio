import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailProducto } from "../../service/productos";
import CardDetalle from "../../component/cards/CardDetalle";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  useEffect(() => {
    detailProducto(id).then((res) => {
      console.log(res);
      setProducto(res);
    });
  }, []);
  return (
    <CardDetalle title={"Detalle producto"}>
      <TextField
        size="small"
        label={"Nombre"}
        value={producto?.nombre || ""}
        focused={true}
      ></TextField>
      <TextField
        size="small"
        label={"Precio"}
        value={producto?.precio || ""}
        focused={true}
      ></TextField>
      <FormControlLabel value={true} control={<Checkbox name="notarial" checked={producto?.notarial} />} label="Notarial" />
      <Button variant="contained">Guardar</Button>
    </CardDetalle>
  );
};

export default DetalleProducto;
