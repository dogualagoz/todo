import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AnaSayfa() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {user ? (
                <div>
                    <h1>Hoşgeldin {user.username}!</h1>
                    <p>Başarıyla giriş yaptınız.</p>
                    <button 
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Çıkış Yap
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Hoşgeldiniz</h1>
                    <p>Giriş yapmadınız.</p>
                    <button
                        onClick={handleLoginClick}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4444ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Giriş Yap
                    </button>
                </div>
            )}
        </div>
    );
}

export default AnaSayfa;
