import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { Email } from "@mui/icons-material";

function ConfirmEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [confirmEmailSuccess, setConfirmEmailSuccess] = useState(false);

  const { confirmUserEmail } = useAuthContext();

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      try {
        confirmUserEmail(oobCode);
        setConfirmEmailSuccess(true);
      } catch (error) {
        console.log("There was a problem with confirming your email:", error);
      }
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {confirmEmailSuccess && oobCode ? (
        <Box sx={{ mt: 1 }}>
          <Email />
          <Typography component="h1" variant="h5">
            Email address confirmed successfully!
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mt: 3 }}
          >
            Back to Home Page
          </Button>
        </Box>
      ) : (
        <Box>
          <Email sx={{ fontSize: 60 }} />
          <Typography component="h1" variant="h5">
            There was a problem confirming your email!
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mt: 3 }}
          >
            Back to Home Page
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default ConfirmEmail;
