import { useEffect, useState } from "react";
import axios from 'axios'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';




function AutocompleteCliente() {
  const [clientes, setCientes] = useState([])
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/clientes/')
    .then(res=>
        {
          setCientes(res.data)
        }
      )
  }, [])

  const filterOptions = createFilterOptions({
    stringify: (option) => option.nombre + option.identificacion,
    limit: 5,
  });

  return (
    <div className="AutocompleteCliente">
      <Autocomplete
      options={clientes}
      getOptionLabel={(option) => option.nombre} // Especifica la propiedad del objeto que se mostrará
      renderInput={(params) => <TextField {...params} label="Choose an option" variant="outlined" />}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.nombre}
        </li>
      )}
      filterOptions={filterOptions}
    />
    </div>
  );
}

export default AutocompleteCliente;
