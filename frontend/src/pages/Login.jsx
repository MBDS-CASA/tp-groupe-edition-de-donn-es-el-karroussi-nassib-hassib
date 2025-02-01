import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleLogin, getUserData } from "../firebaseConfig";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const user = await loginUser(email, password);
            console.log("Logged in successfully with email", user);

            // Retrieve user data from Firestore
            const userData = await getUserData(user.uid);

            // Redirect based on role
            if (userData.role === "ADMIN") navigate("/admin");
            else if (userData.role === "SCOLARITE") navigate("/dashboard");
            else navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { user } = await googleLogin();
            console.log("Logged in successfully with Google", user);

            // Retrieve user data from Firestore
            const userData = await getUserData(user.uid);

            // Redirect based on role
            if (userData.role === "ADMIN") navigate("/admin");
            else if (userData.role === "SCOLARITE") navigate("/dashboard");
            else navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleEmailLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login with Email</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
