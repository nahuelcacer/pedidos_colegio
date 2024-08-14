import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import CardDetalle from "../../component/cards/CardDetalle";
import { useData } from "../../context/DataContext";
import { detailProducto, saveEditProduct } from "../../service/productos";
import { useParams } from "react-router-dom";

const DetalleProducto = () => {
  const { state, dispatch, saveEditProductRed } = useData()
  const { id } = useParams()
  useEffect(() => {
    if (!state.editProduct) {
      detailProducto(id).then(res => dispatch({ type: 'select producto to edit', payload: res }))
    }
  }, [])
  return (
    <CardDetalle title={"Detalle producto"}>
      <TextField
        size="small"
        label={"Nombre"}
        value={state.editProduct?.nombre || ""}
        onChange={(e) => {
          dispatch({
            type: 'change product edit',
            payload: {
              name: e.target.name,
              value: e.target.value
            }
          });
        }}
        name="nombre" // Asegúrate de agregar el atributo name
        focused={true}
      />
      <TextField
        size="small"
        label={"Precio"}
        value={state.editProduct?.precio || ""}
        focused={true}
      ></TextField>
      <FormControlLabel
        value={true}
        control={
          <Checkbox
            name="notarial"
            checked={state.editProduct?.notarial ? true : false}
            onChange={(e) => dispatch({ type: 'change checkbox product edit', payload: e.target.checked })}
          />
        }
        label="Notarial"
      />
      <Button variant="contained" onClick={(e) => { saveEditProduct(state.editProduct) }}>Guardar</Button>
    </CardDetalle>
  );
};

export default DetalleProducto;
