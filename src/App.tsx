import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Suppliers from './pages/Suppliers';
import Clients from './pages/Clients';

const App = () => {
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/suppliers"
          element={isAuthenticated ? <Suppliers /> : <Navigate to="/login" />}
        />
        <Route
          path="/clients"
          element={isAuthenticated ? <Clients /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
