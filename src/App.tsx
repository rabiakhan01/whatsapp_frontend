import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toast } from "./components/shared";
import { useAuthStore } from "./store/features/useAuthStore";

function App() {
  const { currentUser } = useAuthStore();
  const token = currentUser?.access_token;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <h1>Home</h1> : <Navigate to={"/login"} />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to={"/"} />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
