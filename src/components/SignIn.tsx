
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, LinearProgress, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../contexts/authContext';

function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuthContext();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const { email, password } = user;
      const userCredential = await signIn(email, password);

      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Sign-in eror:', error)
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
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Typography component="h1" variant="h5">
        Log In
    </Typography>
    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
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
          sx={{ mt: 3}}
        >
          Log In
        </Button>
        {loading && <LinearProgress />}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
    </Box>
</Container>
  )
}

export default SignIn;