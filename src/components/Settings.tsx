import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { validateEmail } from "../utils/regexUtils";
import { useAuthContext } from "../contexts/authContext";
import { getFirstName, getLastName } from "../utils/displayNameUtils";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { currentUser, updateUserProfile, deleteAccount } = useAuthContext();
  const [userData, setUserData] = useState({
    email: currentUser?.email ?? "",
    firstName: getFirstName(currentUser?.displayName),
    lastName: getLastName(currentUser?.displayName),
    password: "",
    confirmPassword: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) return;

    try {
      setLoading(true);
      setMessage("");
      setError("");
      updateUserProfile(userData);
      setMessage("Profile information updated successfully!");
    } catch (error) {
      setError("Something went wrong, please try again later.");
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    try {
      setLoading(true);
      deleteAccount();
      navigate("/signup");
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container content="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Edit Your Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                name="firstName"
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
                fullWidth
                id="password"
                label="New Password"
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
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                error={!passwordMatch}
                helperText={!passwordMatch && "Passwords do not match."}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleOpenDialog}
                disabled={loading}
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 3 }}
              >
                Delete Profile
              </Button>
              {loading && <LinearProgress />}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Update Profile
              </Button>
              {loading && <LinearProgress />}
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone. All your data will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            No
          </Button>
          <Button onClick={handleDialogConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
