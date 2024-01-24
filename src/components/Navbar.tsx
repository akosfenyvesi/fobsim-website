import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            FobSim
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={"Log In"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Log In</Typography>
              </MenuItem>
              <MenuItem key={"Sign Up"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>
              <MenuItem key={"Run Simulation"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Run Simulation</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FobSim
          </Typography>

          <Stack direction='row' spacing={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
              href="/signin"
              key={"Sign In"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block', '&:hover': { bgcolor: 'black', color: 'white' } }}
            >
              Log In
            </Button>

            <Button
            href="/signup"
              key={"Sign Up"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block', '&:hover': { bgcolor: 'black', color: 'white' } }}
            >
              Sign Up
            </Button>

            <Button
              href="/simulation"
              key={"Run Simulation"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block', '&:hover': { bgcolor: 'black', color: 'white' } }}
            >
              Run Simulation
            </Button>
          </Stack>
    
        </Toolbar>
      </Container>
    </AppBar>
    </ Box>
  )
}

export default Navbar;