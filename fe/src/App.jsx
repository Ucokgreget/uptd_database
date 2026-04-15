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
import AddPegawai from "./pages/AddPegawai.jsx";
import EditClient from "./pages/EditClient.jsx";
import EditPegawai from "./pages/EditPegawai.jsx";
import ManageUser from "./pages/ManageUser.jsx";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";

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
        <Route path="/add-pegawai" element={<AddPegawai />} />
        <Route path="/edit-client/:id" element={<EditClient />} />
        <Route path="/edit-pegawai/:id" element={<EditPegawai />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
