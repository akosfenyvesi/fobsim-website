import { createTheme } from "@mui/material";
import { amber, grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
    }
})

export default theme;
