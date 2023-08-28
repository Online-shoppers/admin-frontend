import { yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[600],
      light: yellow[200],
      dark: yellow[800],
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inset 0 0 0 50px #3b3b3b !important',
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {},
        h6: {
          textDecoration: 'none',
        },
      },
    },
  },
});
