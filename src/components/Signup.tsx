import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { validateEmail } from "../utils/regexUtils";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigte = useNavigate();

  const { signUp } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) return;

    try {
      setLoading(true);
      await signUp(user);
      navigte("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
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

    if (name === "password") setPasswordMatch(value === user.confirmPassword);

    if (name === "confirmPassword") setPasswordMatch(value === user.password);

    if (name === "email") {
      setIsValidEmail(validateEmail(value));
    }
  };

  return (
    <Container content="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={user.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={user.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="Last Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              error={!isValidEmail}
              helperText={!isValidEmail && "Not a valid email address."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={user.password}
              onChange={handleChange}
              autoComplete="current-password"
              name="password"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              error={!passwordMatch}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={user.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              name="confirmPassword"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              error={!passwordMatch}
              helperText={!passwordMatch && "Passwords do not match."}
            />
          </Grid>
        </Grid>
        <Box>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
          {loading && <LinearProgress />}
        </Box>
        <Link component={ReactRouterLink} to="/login" variant="body2">
          {"Already have an account? Log in!"}
        </Link>
      </Box>
    </Container>
  );
}

export default SignUp;
