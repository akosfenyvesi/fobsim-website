import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/home" variant="contained" color="primary">
        Go to Home
      </Button>
    </Box>
  );
}

export default NotFound;
