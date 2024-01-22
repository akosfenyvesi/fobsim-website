import { Container, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";

function App() {
  return(
    <>
    <ThemeProvider theme={ theme }>
    <Navbar />
      <Container sx={{ bgcolor: "tomato", height: "100vh" }}>
        <Signup />
      </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
