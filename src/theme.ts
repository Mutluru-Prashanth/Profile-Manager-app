import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    background: {
      default: '#f5f7fa',
    },
    primary: {
      main: '#1976d2',
    },
    error: {
      main: '#d32f2f',
    },
  },
});

export default theme;
