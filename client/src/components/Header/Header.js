import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img
            src={process.env.PUBLIC_URL + '/images/Logos/logo-icon.svg'}
            alt="Logo"
            width="30"
            height="30"
          />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CO2 Runter: App
        </Typography>
        {props.user ? (
          <>
            <IconButton color="inherit" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Einstellungen</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profil</ListItemText>
              </MenuItem>
              <MenuItem onClick={props.handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <NoteAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Neuen CO2-Fußabdruck berechnen</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LineAxisIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={props.handleLogin}>
              Log in/Registrieren
            </Button>
            <Button color="inherit" onClick={props.handleDashboard}>
              Dashboard
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
