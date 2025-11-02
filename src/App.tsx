import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Posts from "./pages/Posts";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/posts" /> : <Login />} />
        <Route path="/posts" element={user ? <Posts /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
