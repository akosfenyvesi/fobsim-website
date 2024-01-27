
import { Alert, Box, Button, Container, CssBaseline, Grid, LinearProgress, Link, TextField, Typography } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../contexts/authContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuthContext();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
        setLoading(true);
        setMessage('');
        setError('');
        await resetPassword(email);
        setMessage('Check your emails to reset your password!');
    } catch (error) {
        setError('Invalid email');
        console.log('Failed to reset password:', error);
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Typography component="h1" variant="h5">
        Password Reset
    </Typography>
    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3}}
        >
          Reset Password
        </Button>
        {loading && <LinearProgress />}
        <Grid container>
          <Grid item xs>
            <Link component={ReactRouterLink} to="/login" variant="body2">
              Login
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
  )
}

export default ForgotPassword;