import { Autocomplete } from '@mui/material'
import React, { useEffect } from 'react'
import { getClientes } from '../../service/clientes'

const MainPedidos = () => {
    useEffect(()=>{
        getClientes()
    },[])
  return (
    <div>
        {/* <Autocomplete></Autocomplete> */}
    </div>
  )
}

export default MainPedidos