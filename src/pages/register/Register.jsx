import { useNavigate } from "react-router-dom";
import "./Register.css";
import Form from './components/Form';

const Register = () => {
    const navigate = useNavigate();
    
    return (
        <div style = {{display: 'flex', justifyContent: 'center'}}>
            <div>
                <Form />
            </div>
        </div>
    )

};

export default Register;