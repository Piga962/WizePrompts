import { useNavigate } from "react-router-dom";
import "./Login.css";
import Form from "./components/Form";

const Login = ({setUser}) => {
    return (
        <div style = {{display: 'flex', justifyContent: 'center'}}>
            <div>
                <Form setUser={setUser}/>
            </div>
        </div>
    )
};

export default Login;