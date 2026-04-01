import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login.jsx";
import Pegawai from "./pages/Pegawai.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Client from "./pages/Client.jsx";
import AddClient from "./pages/AddClient.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pegawai" element={<Pegawai />} />
        <Route path="/client" element={<Client />} />
        <Route path="/add-client" element={<AddClient />} />
      </Routes>
    </Router>
  );
};

export default App;
