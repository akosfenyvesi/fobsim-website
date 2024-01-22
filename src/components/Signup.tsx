import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";

function Signup() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("Submitted!");
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
                        autoComplete="current-password"
                        name="password"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
            </Button>
        </Box>
    </Container>
  )
}

export default Signup