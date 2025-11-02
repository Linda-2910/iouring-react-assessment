import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!username || !password) {
      setError("Please fill in both fields");
    } else {
      setError("");
    }
  }, [username, password]);
  const handleLogin = () => {
    login(username);
    navigate("/posts");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 380,
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
            mb: 3,
          }}
        >
          USER LOGIN
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1, fontSize: 14 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          disabled={!!error}
          sx={{
            mt: 3,
            py: 1.3,
            fontWeight: 900,
            fontSize: "1rem",
            borderRadius: 2,
            transition: "all 0.25s ease-in-out",
            "&:hover": {
              transform: "translateY(-3px) scale(1.03)",
              boxShadow: "0 8px 25px rgba(33, 150, 243, 0.6)",
            },
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
}
