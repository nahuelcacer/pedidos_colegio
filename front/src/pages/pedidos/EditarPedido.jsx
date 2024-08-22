import {
  Autocomplete,
  Button,
  FormLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import formatArs from "../../tools/formatArs";
import { usePedido } from "../../context/PedidoContext";
import { ReactComponent as DeleteIcon } from "../../icons/trash-bin-trash-svgrepo-com.svg";
import { eliminarPedido, updateItem, updatePedido } from "../../service/pedidos";
import { stackUpdating } from "../../tools/stackingFunctions";


const EditarPedido = ({ setOpen }) => {
  const { state: stateEdit, dispatch, updatePedidos } = usePedido();
  const { clientes, productos } = useData();
  const [edit, setEdit] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Editar pedido # {stateEdit.editPedido.id}</h2>
      </div>
      <div className="container-inputs" style={{ gap: '40px' }}>
        <div>
          <label>Seleccione un cliente</label>
          <Autocomplete
            size="small"
            value={stateEdit.editPedido.cliente}
            onChange={(event, newValue) => { dispatch({ tpye: 'select customer edit', payload: newValue }) }}
            options={clientes}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (<TextField {...params} />)}
          ></Autocomplete>
        </div>

      </div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unidad</th>
            <th>Cantidad</th>
            <th>Total item</th>
          </tr>
        </thead>
        <tbody>

          {stateEdit.editPedido.items.map((item, index) => {
            return (
              <tr>
                <td style={{ textAlign: "center", paddingTop: "10px", width:'250px' }}>
                  <Autocomplete
                    size="small"
                    value={item.producto}
                    onChange={(event, newValue) => { }}
                    options={productos}
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => (<TextField {...params} />)}></Autocomplete>
                </td>
                <td  style={{ textAlign: "center", paddingTop: "10px" }}>{item.producto.precio}</td>
                <td  style={{ textAlign: "center", paddingTop: "10px", width:'100px' }}>
                  <TextField type="number" value={item.cantidad} size="small"></TextField>
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>


    </div>
  )
  // return (
  //   <div>
  //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //       <h2 >Editar pedido #{stateEdit.editPedido.id}</h2>
  //     </div>
  //     <div className="container-inputs" style={{ gap: '40px' }}>
  //       <div>

  //         <label style={{ fontWeight: 700 }}>
  //           Selecciona un cliente
  //         </label>
  //         <Autocomplete
  //           size="small"
  //           value={stateEdit.editPedido.cliente}
  //           onChange={(event, newValue) => {
  //             dispatch({ type: "select customer edit", payload: newValue });
  //           }}
  //           options={clientes}
  //           getOptionLabel={(option) => option.nombre}
  //           renderInput={(params) => (
  //             <TextField {...params} />
  //           )}
  //         />
  //       </div>

  //       <table>
  //         <thead>
  //           <tr>
  //             <th><span>Producto</span></th>
  //             <th>Precio unitario</th>
  //             <th>Cantidad</th>
  //             <th>Total item</th>
  //             <th>*</th>
  //           </tr>
  //         </thead>
  //         {stateEdit.editPedido.items.map((item, index) => {
  //           const itemForUpdated = { id: item.id, cantidad: item.cantidad, producto: item.producto.id }

  //           return (
  //             <tr key={item.producto.id}>
  //               <td style={{ textAlign: "center", paddingTop: "10px" }}>
  //                 {item.producto.nombre}
  //               </td>
  //               <td style={{ textAlign: "center", paddingTop: "10px" }}>
  //                 {formatArs.format(item.producto.precio)}
  //               </td>
  //               <td style={{ textAlign: "center", paddingTop: "10px" }}>
  //                 <TextField
  //                   sx={{ width: '75px' }}
  //                   type="number"
  //                   size="small"
  //                   value={item.cantidad}
  //                   onChange={(e) => {}}
  //                 ></TextField>
  //               </td>
  //               <td style={{ textAlign: "center", paddingTop: "10px" }}>
  //                 {formatArs.format(item.total_item)}
  //               </td>
  //               <td style={{ textAlign: "center", paddingTop: "10px" }}>
  //                 <IconButton
  //                   size="small"
  //                   onClick={(e) => {
  //                     dispatch({ type: 'delete item edit', payload: index })
  //                   }}
  //                 >
  //                   <DeleteIcon width="18px" height="18px" />
  //                 </IconButton>
  //               </td>
  //             </tr>
  //           );
  //         })}
  //       </table>
  //       <div>
  //         <Stack direction='row' spacing={2}>
  //           <Button variant="contained" onClick={(e) => {stackUpdating({children: async () => {
  //             await updatePedido(stateEdit.editPedido); 
  //             updatePedidos()
  //           }})}}>Guardar</Button>
  //           <Button variant="outlined" color="error" onClick={(e) => { stackUpdating({
  //             children: async () => {
  //               await eliminarPedido(stateEdit.editPedido.id)
  //               await updatePedidos()
  //             }
  //           })  }}>Borrar</Button>
  //         </Stack>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default EditarPedido;
