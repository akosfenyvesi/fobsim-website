import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signUp } from "../services/authService";

function SignUp() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''});

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user.password !== user.confirmPassword)
            return;

        try {
            const { email, password, firstName, lastName } = user;
            const userCredential = await signUp({ email, password, firstName, lastName });

            console.log('User signed up:', userCredential.user);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });

        setPasswordMatch(
            (name === 'password' && user.confirmPassword === value) ||
            (name === 'confirmPassword' && user.password === value)
          );
    };

  return (
    <Container content="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
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
                        helperText={!passwordMatch && 'Passwords do not match.'}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
            </Button>
        </Box>
    </Container>
  )
}

export default SignUp;