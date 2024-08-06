import {
  Avatar,
  Button,
  Chip,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SeleccionPedido from "./SeleccionPedido";
import CardDetalle from "../../component/cards/CardDetalle";
import formatArs from "../../tools/formatArs";
import { getPedidos } from "../../service/pedidos";
import PaginadorPedidos from "./PaginadorPedidos";
import { useBusqueda } from "../../context/BusquedaContext";

const ListData = ({ data }) => {
  const renderedRows = useMemo(() => {
    return data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.cliente.nombre}</TableCell>
        <TableCell>{item.cliente.identificacion}</TableCell>
        <TableCell>
          {item.user_creator ? (
            <Chip
              size="small"
              variant="outlined"
              avatar={
                <Avatar>
                  {item.user_creator.username.charAt(0).toUpperCase()}
                </Avatar>
              }
              label={item.user_creator.username}
            />
          ) : null}
        </TableCell>
        <TableCell>{item.total_pedido}</TableCell>
      </TableRow>
    ));
  }, [data]);

  return <>{renderedRows}</>;
};

const MainPedidos = () => {
  const { search, fecha } = useBusqueda();
  const headers = [
    { nombre: "NOMBRE" },
    { nombre: "DNI/CUIT" },
    { nombre: "USUARIO CARGA" },
    { nombre: "IMPORTE TOTAL" },
  ];

  const [listadoPedidos, setListadoPedidos] = useState([]);
  const [items, setItems] = useState([]);
  const [pedido, setPedido] = useState({
    cliente: null,
    pedido: [],
  });

  const searchParams = new URLSearchParams({
    q: search,
    fecha:fecha
  });

  useEffect(()=> {
    getPedidos(searchParams).then((res) => {
      setListadoPedidos(res);
    });

  }, [search, fecha])

  useEffect(() => {
    setInterval(() => {
      getPedidos(searchParams).then((res) => {
        setListadoPedidos(res);
      });
    }, 15000);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CardDetalle title={"Agregar pedidos"} width="95%">
          <SeleccionPedido
            pedido={pedido}
            setPedido={setPedido}
            setItems={setItems}
            items={items}
          ></SeleccionPedido>
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
              {items?.map((item) => (
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
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              position: "relative",
              bottom: "0",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            {items.reduce((acc, item) => acc + item.totalItem, 0) == 0 ? (
              ""
            ) : (
              <span style={{ fontWeight: 700 }}>
                {formatArs.format(
                  items.reduce((acc, item) => acc + item.totalItem, 0)
                )}
              </span>
            )}
          </div>
        </CardDetalle>
        <div style={{ textAlign: "right", marginRight: "23px" }}>
          <Button sx={{ width: "200px" }} variant="contained">
            Agregar{" "}
          </Button>
        </div>
      </div>

      <CardDetalle title={"Listado de pedidos"} width="95%">
        <PaginadorPedidos
          pedidos={listadoPedidos}
          itemsPerPage={10}
          headers={headers}
        >
          {(dataVisibles) => <ListData data={dataVisibles}></ListData>}
        </PaginadorPedidos>
      </CardDetalle>
    </div>
  );
};

export default MainPedidos;
