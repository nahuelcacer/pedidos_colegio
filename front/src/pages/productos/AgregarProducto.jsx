import React, { useEffect } from 'react'
import CardDetalle from '../../component/cards/CardDetalle'
import useInput from '../../hooks/useInput'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const AgregarProducto = () => {
  const { values, onChange } = useInput({})
  return (

    <CardDetalle title={'Agregar producto'}>
      <div className='container-inputs'>
        <TextField size="small" name='nombre' label="Nombre"
          onChange={(e) => { onChange(e) }}></TextField>
        <TextField size="small" name="precio" label="Precio"
          onChange={(e) => { onChange(e) }}></TextField>
        <FormControl size="small">
          <InputLabel id="escribano-label">Notarial</InputLabel>
          <Select
            labelId="escribano-label"
            id="escribano"
            name="escribano"
            label="notarial"
            value={false}
            onChange={(e)=>{onChange(e)}}
          >
            <MenuItem name="notarial" value={true}>NOTARIAL</MenuItem>
            <MenuItem name="notarial" value={false}>COMUN</MenuItem>
          </Select>
        </FormControl>
      </div>
    </CardDetalle>
  )
}

export default AgregarProducto