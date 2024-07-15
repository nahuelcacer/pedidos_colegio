import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const AgregarContacto = ({ contactos }) => {
    const [editing, setEditing] = useState(null)
    const [newContacto, setNewContacto] = useState('');

    const handleAgregarClick = () => {
        setEditing(true)
    }

    const handleSaveContacto = () => {
        // Aquí podrías guardar el nuevo contacto en la base de datos o hacer lo necesario
        console.log('Guardando contacto:', newContacto);
        setEditing(false);
        setNewContacto('');
    };

    const handleCancelContacto = () => {
        setEditing(false);
        setNewContacto('');
    }
    return (
        <div>

            {
                contactos ? <div>{contactos.map(item=>{return (<div>{item.telefono}</div>)})}</div> : <div>{editing ? (
                    <div style={{display:'flex', gap:'10px'}}>
                        <TextField
                            label="Contacto"
                            size='small'
                            type="text"
                            value={newContacto}
                            onChange={(e) => setNewContacto(e.target.value)}
                        // placeholder="Nuevo contacto"
                        />
                        <Button variant='contained' onClick={handleSaveContacto}>Guardar</Button>
                        <Button variant='contained' color='error' onClick={handleCancelContacto}>Cancelar</Button>
                    </div>
                ) : (
                    <div>
                        <div style={{width:'100%', backgroundColor:'black'}}></div>
                        <h4>Contacto</h4>
                        <Button variant="contained" onClick={handleAgregarClick}>
                            Agregar
                        </Button>
                    </div>
                )}</div>
            }
        </div>
    )
}

export default AgregarContacto