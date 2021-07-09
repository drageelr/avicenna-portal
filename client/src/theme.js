import { red, blue } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#fffff',
    },
    secondary: {
      main: blue[900],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#717486',
    },
  },
});

export default theme;