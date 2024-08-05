import { Autocomplete, Button, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClientes } from '../../service/clientes'
import SeleccionPedido from './SeleccionPedido'
import CardDetalle from '../../component/cards/CardDetalle'
import useItemsOrder from '../../hooks/useItemsOrder'
import formatArs from '../../tools/formatArs'
import { getPedidos } from '../../service/pedidos'

const MainPedidos = () => {
  const [listadoPedidos, setListadoPedidos] = useState(null)
  const [items, setItems] = useState([])
  const [pedido, setPedido] = useState({
    cliente: null,
    pedido: []
  })
  useEffect(()=> {
    getPedidos()
    .then(res=>{setListadoPedidos(res)})
  }, [])
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <CardDetalle title={'Agregar pedidos'} width='95%'>

          <SeleccionPedido pedido={pedido} setPedido={setPedido} setItems={setItems} items={items}></SeleccionPedido>

        </CardDetalle>

        <CardDetalle title={'Items agregados'} width='95%' maxHeight='240px'>
          <table style={{ width: '100%', borderCollapse: 'collapse', gap: '10px' }}>
            <thead>
              <tr>
                <th >Producto</th>
                <th >Precio unitario</th>
                <th >Cantidad</th>
                <th >Total item</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(item => (
                <tr key={item.producto.id}>
                  <td style={{ textAlign: 'center', paddingTop: '10px' }}>{item.producto.nombre}</td>
                  <td style={{ textAlign: 'center', paddingTop: '10px' }}>{formatArs.format(item.producto.precio)}</td>
                  <td style={{ textAlign: 'center', paddingTop: '10px' }}>x{item.cantidad}</td>
                  <td style={{ textAlign: 'center', paddingTop: '10px' }}>{formatArs.format(item.totalItem)}</td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td style={{textAlign:'center'}}>
                  <span style={{fontWeight:700}}>{items.reduce((acc, item) => acc + item.totalItem, 0)}</span>
                </td>
              </tr>
            </tfoot> */}
          </table>
          <div style={{ position: 'relative', bottom: '0', textAlign: 'right', marginRight: '25px' }}>
            {items.reduce((acc, item) => acc + item.totalItem, 0) == 0 ? '' : <span style={{ fontWeight: 700 }}>{formatArs.format(items.reduce((acc, item) => acc + item.totalItem, 0))}</span>}

          </div>
        </CardDetalle>
        <div style={{textAlign:'right', marginRight:'23px'}}>
          <Button sx={{ width: '200px' }} variant='contained'>Agregar </Button>
        </div>
      </div>

      <CardDetalle title={'Listado de pedidos'} width='95%'>
             {listadoPedidos?.map(item => {
              return (
                <>
                <div style={{fontSize:'12px'}}>{item.cliente.nombre}</div>
                <div>{item.user_creator.username}</div>
                </>
              )
             })}
      </CardDetalle>
    </div>
  )
}

export default MainPedidos