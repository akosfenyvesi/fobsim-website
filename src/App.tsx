import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";
import { Home } from "@mui/icons-material";

function App() {
  return(
    <>
    <ThemeProvider theme={ theme }>
    <Navbar />
      <Home />
    </ThemeProvider>
    </>
  );
}

export default App;
