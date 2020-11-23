import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import  Routes  from "../routes/routes";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#005A3C",
      light: "#E9F0F0",
      dark: "#005A3C",
      contrastText: "#fff"
    },
  },
});

function App() {
  return (

    <ThemeProvider theme={outerTheme}>
    <Router >
      <Routes />
    </Router>
    </ThemeProvider>
    );
}

export default App;
