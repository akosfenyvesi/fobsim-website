
import { Alert, Box, Button, Container, CssBaseline, Grid, LinearProgress, Link, TextField, Typography } from '@mui/material';
import { Link as ReactRouterLink, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../contexts/authContext';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState({
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const oobCode = searchParams.get('oobCode');

  const { confirmResetPassword } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
        setLoading(true);
        setMessage('');
        setError('');

        if (oobCode) {
            await confirmResetPassword(oobCode, user.password);
            setMessage('Password changed successfully!');
        } else {
            setError('Something is wrong, try again later!')
        }
    } catch (error) {
        setError('Invalid email');
        console.log('Failed to reset password:', error);
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

    if (name === 'password')
            setPasswordMatch(value === user.confirmPassword);

    if (name === 'confirmPassword')
        setPasswordMatch(value === user.password);
    };
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Typography component="h1" variant="h5">
        Reset Your Password
    </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
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

export default ResetPassword;