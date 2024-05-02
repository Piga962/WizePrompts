import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    
    return (
        <div className="Register">
        <h1>Register</h1>
        <button onClick={() => navigate("/Login")}>Login</button>
        <button onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default Register;