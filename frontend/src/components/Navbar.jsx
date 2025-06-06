import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <nav style={{
            backgroundColor: '#333',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Todo App
            </div>
            <div>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>Hoş geldin, {user.username}!</span>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Çıkış Yap
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleLoginClick}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#4444ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Giriş Yap
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Kayıt Ol
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;