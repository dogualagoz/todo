import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import GirisFormu from './components/GirisFormu';
import AnaSayfa from './components/AnaSayfa';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <div style={{ paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<AnaSayfa />} />
              <Route path="/login" element={<GirisFormu />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
