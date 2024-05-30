import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../images/wizeline-sin-fondo.png';

const Login = () => {
    const navigate = useNavigate();
    
    return (
        <div className="Login-container">
            <div className="Login-Heading">
                <button className="Home-button" onClick={() => navigate("/")}>
                    <img src={logo} alt="logo"/>
                </button>
                <h1>WizePrompt</h1>
            </div>
            <div className="Login-Inputs">
                <h1>Sign In</h1>
                <label className="input">
                    <h2>Email</h2>
                    <input className="input-text" type="email" name="email" placeholder="Email"/>
                </label>
                <label className="input">
                    <h2>Password</h2>
                    <input className="input-text" type="password" name="password" placeholder="Password"/>
                </label>
            </div>
            <div className="Button-container">
                <button className="Login-button" onClick={() => navigate("/")}>Sign In</button>
            </div>
            <div className = "create-acount">
                <p>
                    Don't have an account? Create one <span className="highlight" onClick={() => navigate("/register")}>here</span>.
                </p>
            </div>
        </div>
    );
};

export default Login;