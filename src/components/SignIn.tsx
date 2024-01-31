import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn, signInWithGoogle } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { email, password } = user;
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in eror:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.log("Login with Google failed:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button
          onClick={loginWithGoogle}
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Login With Google
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          value={user.email}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={user.password}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Log In
        </Button>
        {loading && <LinearProgress />}
        <Grid container>
          <Grid item xs>
            <Link
              component={ReactRouterLink}
              to="/forgot-password"
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={ReactRouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignIn;
