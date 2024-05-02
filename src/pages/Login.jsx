import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    
    return (
        <div className="Login">
        <h1>Login</h1>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default Login;