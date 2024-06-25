import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClientes } from '../../service/clientes'
import SeleccionPedido from './SeleccionPedido'

const MainPedidos = () => {
  const [pedido, setPedido] = useState({
    cliente:null,
    pedido:[]
  })


 
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr' }}>
      <div>
      <SeleccionPedido></SeleccionPedido>

      </div>
      <div className='card'>sss</div>
    </div>
  )
}

export default MainPedidos