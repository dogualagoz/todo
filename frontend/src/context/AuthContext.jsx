import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/login',{
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            
            const data = await response.json();
            if (response.ok) {
                setUser({ username });
                setError(null);
                return {success: true, message: data.message};
            } else {
                setError(data.detail);
                return {success: false, message: data.detail};
            }
        } catch (error) {
            const errorMessage = "Sunucuya bağlanırken bir hata oluştu";
            setError(errorMessage);
            return {success: false, message: errorMessage};
        }
    }

    const logout = async () => {
        try {
            if (user) {
                const response = await fetch('http://localhost:8000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: user.username }),
                });

                setUser(null);
                setError(null);

                if (!response.ok) {
                    const data = await response.json();
                    setError(data.detail);
                    return { success: false, message: data.detail };
                }

                return { success: true, message: "Başarıyla çıkış yapıldı" };
            }
            return { success: true, message: "Zaten çıkış yapılmış" };
        } catch (error) {
            const errorMessage = "Çıkış yaparken bir hata oluştu";
            setError(errorMessage);
            setUser(null);
            return { success: false, message: errorMessage };
        }
    }

    const register = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setError(null);
                return { success: true, message: data.message };
            } else {
                setError(data.detail);
                return { success: false, message: data.detail };
            }
        } catch (error) {
            const errorMessage = "Kayıt işlemi sırasında bir hata oluştu";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const isAuthenticated = () => {
        return user !== null;
    }

    const value = {
        user,
        error,
        login,
        logout,
        register,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
