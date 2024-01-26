import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/Navbar";
import "./firebase.js"
import AppRouter from "./components/Router.js";
import { AuthProvider } from "./contexts/authContext.js";

function App() {
  return(
    <ThemeProvider theme={ theme }>
      <AuthProvider>
        <AppRouter>
          <Navbar />
        </AppRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
