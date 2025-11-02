import { AppBar, Link, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={2}
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#fafafa",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        <Link
          href="#"
          underline="hover"
          color="primary"
          sx={{ fontWeight: 500 }}
        >
          Contact Us
        </Link>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} iouring — All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
