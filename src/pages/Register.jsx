import { useNavigate } from "react-router-dom";
import "./Register.css";
import logo from '../images/wizeline-sin-fondo.png';

const Register = () => {
    const navigate = useNavigate();
    
    return (
        <div className="Register-container">
            <div className="Register-Heading">
                <button className="Home-button" onClick={() => navigate("/")}>
                    <img src={logo} alt="logo"/>
                </button>
                <h1>Register</h1>
            </div>
            <div className="Register-Inputs">
                <label className="input">
                    <h2>Name</h2>
                    <input className="input-text" type="text" name="name" placeholder="Name"/>
                </label>
                <label className="input">
                    <h2>Email</h2>
                    <input className="input-text" type="email" name="email" placeholder="Email"/>
                </label>
                <label className="input">
                    <h2>Password</h2>
                    <input className="input-text" type="password" name="password" placeholder="Password"/>
                </label>
                <label className="input">
                    <h2>Confirm Password</h2>
                    <input className="input-text" type="password" name="confirmPassword" placeholder="Password"/>
                </label>
                <label className="checkbox">
                    <input className="input-checkbox" type="checkbox" name="terms"/>
                    <span>I agree with the terms and conditions of Service</span>
                </label>
            </div>

            <button className="Register-button" onClick={() => navigate("/Login")}>Create account</button>
        </div>
    );
};

export default Register;