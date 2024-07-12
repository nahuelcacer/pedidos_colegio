import { Checkbox, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { detailProducto } from '../../service/productos'
import CardDetalle from '../../component/cards/CardDetalle'

const DetalleProducto = () => {
    const {id} = useParams()
    const [producto, setProducto] = useState(null)
    useEffect(()=>{
        detailProducto(id)
        .then(res=>{setProducto(res)})
    },[])
  return (
    // <div className='card' style={{display:'flex', flexDirection:'column', gap:'10px', width:'400px'}}>
    <CardDetalle title={"Detalle producto"}> 

        {/* <header style={{backgroundColor:''}}><h2>Edicion productos</h2></header> */}
        <TextField size="small" label={'Nombre'} value={producto?.nombre || ''} focused={true}></TextField>
        <TextField size="small" label={'Precio'} value={producto?.precio || ''} focused={true}></TextField>
        <Checkbox value={producto?.escribano}></Checkbox>
    </CardDetalle>
    // </div>
  )
}

export default DetalleProducto