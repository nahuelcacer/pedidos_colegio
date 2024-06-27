import { createTheme } from '@mui/material/styles';
export const palette = {
    primary: '#4087F1',
    secondary: '#f19740',
    accent: '#a96a2d',
    text: '#2d7aa9',
    background: '#ffffff',
}

// theme.js


export const theme = createTheme({
    palette: {
        primary: {
            main: '#4087F1', // Cambia el color principal según tu preferencia
        },
        error: {
            main:'#f19740',
            contrastText:'#fff'
        }
        // Define más colores según tus necesidades
    },
});
