import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { validateEmail } from "../utils/regexUtils";

function Settings() {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) return;

    try {
      setLoading(true);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "password")
      setPasswordMatch(value === userData.confirmPassword);

    if (name === "confirmPassword")
      setPasswordMatch(value === userData.password);

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
              value={userData.firstName}
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
              value={userData.lastName}
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
              value={userData.email}
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
              value={userData.password}
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
              value={userData.confirmPassword}
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
      </Box>
    </Container>
  );
}

export default Settings;
