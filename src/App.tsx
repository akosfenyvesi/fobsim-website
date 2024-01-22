import { Container, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";

function App() {
  return(
    <>
    <ThemeProvider theme={ theme }>
    <Navbar />
      <Container sx={{ bgcolor: "tomato", height: "100vh" }}>
        <Typography sx={{ p: 1 }}>Hello World!</Typography>
      </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
