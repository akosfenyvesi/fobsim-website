import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";
import "./firebase.js"
import AppRouter from "./components/Router.js";

function App() {
  return(
    <ThemeProvider theme={ theme }>
      <Navbar />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
