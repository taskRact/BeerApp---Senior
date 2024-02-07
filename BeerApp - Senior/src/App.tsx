import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Router from "./router";

function App() {

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
