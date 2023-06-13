import { amber, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: green['900']
    },
    secondary: {
      main: amber.A700
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none'
        }
      }
    }
  }
});

export { theme };
