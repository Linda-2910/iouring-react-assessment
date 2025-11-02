import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../assets/iouring.png";
import { useState } from "react";
import type { HeaderProps } from "./Header.types";

export default function Header({ username }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setLogoutConfirm(false);
    localStorage.clear();
    location.href = "/";
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          background: "linear-gradient(90deg, #84c6fc, #1e88e5, #1565c0)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src={Logo}
              alt="Logo"
              height={40}
              style={{
                borderRadius: 8,
              }}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{username}</Typography>
            <Avatar
              sx={{ color: "#1976d2", bgcolor: "#fff", width: 32, height: 32 }}
            >
              {username?.[0]?.toUpperCase()}
            </Avatar>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setLogoutConfirm(true);
                }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={logoutConfirm} onClose={() => setLogoutConfirm(false)}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setLogoutConfirm(false)}>
            Cancel
          </Button>
          <Button color="error" onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
