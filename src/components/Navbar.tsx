import * as React from "react";
import Avatar from "@mui/material/Avatar";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { currentUser, logOut } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      handleCloseUserMenu();
      navigate("/login");
    } catch (error) {
      console.error("Log out eror:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FobSim
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {!currentUser && (
                  <MenuItem key={"Log In"} onClick={handleCloseNavMenu}>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Log In</Typography>
                    </Link>
                  </MenuItem>
                )}
                {!currentUser && (
                  <MenuItem key={"Sign Up"} onClick={handleCloseNavMenu}>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Sign Up</Typography>
                    </Link>
                  </MenuItem>
                )}
                {currentUser && (
                  <MenuItem key={"Run Simulation"} onClick={handleCloseNavMenu}>
                    <Link
                      to="/simulation"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Run Simulation</Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FobSim
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {!currentUser && (
                <Button
                  key={"Log In"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    "&:hover": { bgcolor: "black", color: "white" },
                  }}
                >
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Log In
                  </Link>
                </Button>
              )}

              {!currentUser && (
                <Button
                  key={"Sign Up"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    "&:hover": { bgcolor: "black", color: "white" },
                  }}
                >
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign Up
                  </Link>
                </Button>
              )}

              {currentUser && (
                <Button
                  key={"Run Simulation"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    "&:hover": { bgcolor: "black", color: "white" },
                  }}
                >
                  <Link
                    to="/simulation"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Run Simulation
                  </Link>
                </Button>
              )}
            </Stack>

            {currentUser && (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser?.displayName ?? ""} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key="Settings" onClick={handleCloseUserMenu}>
                    <Link
                      to="/settings"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Settings</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem key="Log Out" onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
