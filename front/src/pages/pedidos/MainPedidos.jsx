import { Autocomplete, Avatar, Button, Card, Chip, TableCell, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SeleccionPedido from './SeleccionPedido'
import CardDetalle from '../../component/cards/CardDetalle'
import formatArs from '../../tools/formatArs'
import { getPedidos } from '../../service/pedidos'
import PaginadorPedidos from './PaginadorPedidos'
import { getColorForUser } from '../../tools/generateColor'



const ListData = ({ data }) => {
  return (
    <>
      {data.map(item => (

        <TableRow>
          <TableCell>{item.cliente.nombre}</TableCell>
          <TableCell>{item.cliente.identificacion}</TableCell>
          <TableCell>
            {
              item.user_creator ?
                <Chip
                  size='small'
                  variant='outlined'
                  avatar={<Avatar>{item.user_creator.username.substr(0, 1).toUpperCase()}</Avatar>}
                  label={item.user_creator.username}
                ></Chip>
                : <></>
            }
          </TableCell>
          <TableCell>{item.total_pedido}</TableCell>
        </TableRow>
      ))}
    </>
  )
}

const MainPedidos = () => {
  const headers = [{ nombre: 'NOMBRE' }, { nombre: 'DNI/CUIT' }, { nombre: 'USUARIO CARGA' }, { nombre: 'IMPORTE TOTAL' }]

  const [listadoPedidos, setListadoPedidos] = useState([])
  const [items, setItems] = useState([])
  const [pedido, setPedido] = useState({
    cliente: null,
    pedido: []
  })
  const [search, setSearch] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(() => {
    setInterval(() => {


      getPedidos(searchParams)
        .then(res => { setListadoPedidos(res) })
    }, 15000)
  }, [])

  const searchParams = new URLSearchParams({
    q: search,
    fecha: fecha
  })



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
           
          </table>
          <div style={{ position: 'relative', bottom: '0', textAlign: 'right', marginRight: '25px' }}>
            {items.reduce((acc, item) => acc + item.totalItem, 0) == 0 ? '' : <span style={{ fontWeight: 700 }}>{formatArs.format(items.reduce((acc, item) => acc + item.totalItem, 0))}</span>}

          </div>
        </CardDetalle>
        <div style={{ textAlign: 'right', marginRight: '23px' }}>
          <Button sx={{ width: '200px' }} variant='contained'>Agregar </Button>
        </div>
      </div>

      <CardDetalle title={'Listado de pedidos'} width='95%'>
        <PaginadorPedidos pedidos={listadoPedidos} itemsPerPage={10} headers={headers} setSearch={setSearch}>
          {(dataVisibles) => (

            <ListData data={dataVisibles}></ListData>
          )}
        </PaginadorPedidos>
      </CardDetalle>
    </div>
  )
}

export default MainPedidos