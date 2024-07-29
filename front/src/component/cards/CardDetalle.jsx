import React from 'react'
import './CardDetalle.css'
const CardDetalle = ({ children, title, width = '350px', maxHeight = 'None'}) => {
    return (
    <div>
        <div id='cardDetalle' style={{ width, overflow:'hidden'}}>
            <div style={{ backgroundColor: '#4087F1', padding:'15px', borderTopLeftRadius:'5px', borderTopRightRadius:'5px',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{fontSize:'18px', color:'#ffffff', fontWeight:600}}>{title.toUpperCase()}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding:'20px', overflowY:'auto', maxHeight}}>{children}</div>
        </div>
    </div>
    )
}

export default CardDetalle