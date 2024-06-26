
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { ReactComponent as EditIcon } from '../../icons/edit-svgrepo-com.svg';
import { ReactComponent as DeleteIcon } from '../../icons/trash-bin-trash-svgrepo-com.svg';
import { Link } from 'react-router-dom';


export default function FadeMenu({cliente}) {
    const [anchorEl, setAnchorEl] = useState(false)
    const open = anchorEl
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="F-More"> <path d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" id="Horizontal"></path> </g> </g> </g></svg>

            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Link to={cliente}>
                    <MenuItem style={{ gap: '20px' }}>
                        <EditIcon width="18px" height="18px" />
                        Editar
                    </MenuItem>
                </Link>
                <Link to="eliminar">
                <MenuItem onClick={handleClose} style={{ gap: '20px' }}>
                    <DeleteIcon width="18px" height="18px" />
                    Eliminar
                </MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </div>
    );
}
