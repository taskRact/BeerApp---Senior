import { amber, lightGreen } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen['900']
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
    },

    MuiSvgIcon: {
      defaultProps: {
        htmlColor: amber.A700
      }
    }
  }
});

export { theme };
