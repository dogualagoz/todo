import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const result = await register(username, password);
            
            if (result.success) {
                setSuccessMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
                // 2 saniye sonra login sayfasına yönlendir
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Kayıt işlemi sırasında bir hata oluştu");
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '40px auto', 
            padding: '20px',
            textAlign: 'center' 
        }}>
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <button 
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Kayıt Ol
                </button>
            </form>
            {error && (
                <p style={{ 
                    color: 'red', 
                    marginTop: '10px',
                    fontSize: '14px' 
                }}>
                    {error}
                </p>
            )}
            {successMessage && (
                <p style={{ 
                    color: 'green', 
                    marginTop: '10px',
                    fontSize: '14px' 
                }}>
                    {successMessage}
                </p>
            )}
            <p style={{ marginTop: '20px' }}>
                Zaten hesabınız var mı?{' '}
                <span 
                    onClick={() => navigate('/login')}
                    style={{ 
                        color: '#4444ff', 
                        cursor: 'pointer',
                        textDecoration: 'underline' 
                    }}
                >
                    Giriş yapın
                </span>
            </p>
        </div>
    );
}

export default RegisterForm;