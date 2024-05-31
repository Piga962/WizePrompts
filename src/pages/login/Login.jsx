import { useNavigate } from "react-router-dom";
import "./Login.css";
import Form from "./components/Form";

const Login = () => {
    
    return (
        <div style = {{display: 'flex', justifyContent: 'center'}}>
            <div>
                <Form />
            </div>
        </div>
    )
};

export default Login;