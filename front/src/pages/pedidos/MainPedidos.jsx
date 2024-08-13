import {
  Avatar,
  Button,
  Chip,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import SeleccionPedido from "./SeleccionPedido";
import CardDetalle from "../../component/cards/CardDetalle";
import formatArs from "../../tools/formatArs";
import PaginadorPedidos from "./PaginadorPedidos";
import { deepOrange } from "@mui/material/colors";
import CustomModal from "../../component/modal/CustomModal";
import EditarPedido from "./EditarPedido";
import { ReactComponent as DeleteIcon } from "../../icons/trash-bin-trash-svgrepo-com.svg";
import { usePedido } from "../../context/PedidoContext";

const ListData = ({ data, setOpen }) => {
  const { dispatch } = usePedido()
  const renderedRows = useMemo(() => {
    return data.map((item) => (
      <TableRow
        id="rowClickleable"
        key={item.id}
        onClick={() => {
          dispatch({type:'select pedido edit', payload:item})
          setOpen(true)
        }}
      >
        <TableCell>{item.cliente.nombre}</TableCell>
        <TableCell>{item.cliente.identificacion}</TableCell>
        <TableCell>
          {item.user_creator ? (
            <Chip
              size="small"
              variant="outlined"
              avatar={
                <Avatar sx={{ bgcolor: deepOrange[300] }}>
                  <div style={{ color: "white" }}>
                    {item.user_creator.username.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
              }
              label={item.user_creator.username}
            />
          ) : null}
        </TableCell>
        <TableCell>{formatArs.format(item.total_pedido)}</TableCell>
      </TableRow>
    ));
  }, [data]);
  return  renderedRows.length > 0 ? <>{renderedRows}</> : <TableCell colSpan={5}><p style={{textAlign:'center', padding:'20px'}}>No se encontraron registros</p></TableCell>
};

const MainPedidos = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch, pedidos } = usePedido();


  const handleClose = () => setOpen(false);
  const headers = [
    { nombre: "NOMBRE" },
    { nombre: "DNI/CUIT" },
    { nombre: "USUARIO" },
    { nombre: "IMPORTE TOTAL" },
  ];

  const handleDelete = (index) => {
    dispatch({ type: "delete item", payload: index });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CardDetalle title={"Agregar pedidos"} width="95%">
          <SeleccionPedido />
        </CardDetalle>

        <CardDetalle title={"Items agregados"} width="95%" maxHeight="240px">
          <table
            style={{ width: "100%", borderCollapse: "collapse", gap: "10px" }}
          >
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Total item</th>
              </tr>
            </thead>
            <tbody>
              {state.items?.map((item, index) => (
                <tr key={item.producto.id}>
                  <td style={{ textAlign: "center", paddingTop: "10px" }}>
                    {item.producto.nombre}
                  </td>
                  <td style={{ textAlign: "center", paddingTop: "10px" }}>
                    {formatArs.format(item.producto.precio)}
                  </td>
                  <td style={{ textAlign: "center", paddingTop: "10px" }}>
                    x{item.cantidad}
                  </td>
                  <td style={{ textAlign: "center", paddingTop: "10px" }}>
                    {formatArs.format(item.totalItem)}
                  </td>
                  <td style={{ textAlign: "center", paddingTop: "10px" }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        handleDelete(index);
                      }}
                    >
                      <DeleteIcon width="18px" height="18px" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardDetalle>
        <div style={{ textAlign: "right", marginRight: "23px" }}>
          <Button sx={{ width: "200px" }} variant="contained">
            Agregar
          </Button>
        </div>
      </div>

      <CardDetalle title={"Listado de pedidos"} width="95%">
        <PaginadorPedidos pedidos={pedidos} itemsPerPage={10} headers={headers}>
          {(dataVisibles) =>
            dataVisibles ? (
              <ListData setOpen={setOpen} data={dataVisibles} />
            ) : (
              <p style={{ padding: "20px 0px" }}>No se encontraron registros</p>
            )
          }
        </PaginadorPedidos>
      </CardDetalle>
      <CustomModal open={open} handleClose={handleClose}>
        <div>
          {open ? (
            <EditarPedido></EditarPedido>
          ) : (
            <></>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default MainPedidos;
