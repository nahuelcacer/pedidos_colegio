import { Autocomplete, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClientes } from '../../service/clientes'
import SeleccionPedido from './SeleccionPedido'
import CardDetalle from '../../component/cards/CardDetalle'

const MainPedidos = () => {
  const [pedido, setPedido] = useState({
    cliente: null,
    pedido: []
  })



  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <CardDetalle title={'Agregar pedidos'} width='95%'>

          <SeleccionPedido setPedido={setPedido}></SeleccionPedido>

        </CardDetalle>
        <CardDetalle title={'Items agregados'} width='95%'></CardDetalle>
      </div>

      <CardDetalle title={'Listado de pedidos'} width='95%'>

      </CardDetalle>
    </div>
  )
}

export default MainPedidos