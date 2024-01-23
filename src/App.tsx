import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";
import SignUp from "./components/SignUp";
import "./firebase.js"

function App() {
  return(
    <>
    <ThemeProvider theme={ theme }>
      <Navbar />
      <SignUp />
    </ThemeProvider>
    </>
  );
}

export default App;
