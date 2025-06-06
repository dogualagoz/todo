import { useAuth } from "../context/AuthContext";

function AnaSayfa() {
    const { user } = useAuth();

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {user ? (
                <div>
                    <h1>Hoş Geldiniz!</h1>
                    <p>Todo listenizi görüntüleyebilirsiniz.</p>
                </div>
            ) : (
                <div>
                    <h1>Todo Uygulamasına Hoş Geldiniz</h1>
                    <p>Başlamak için lütfen giriş yapın.</p>
                </div>
            )}
        </div>
    );
}

export default AnaSayfa;
