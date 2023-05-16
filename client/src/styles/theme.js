import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#048500',
    },
    secondary: {
      main: '#fdcb00',
    },
  },
  typography: {
    fontFamily: 'SF Pro Display, Arial, sans-serif',
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
});

export default theme;
