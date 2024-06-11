import {useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../images/wizeline-sin-fondo.png';

const Form = ({setUser}) =>{
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        const newForm = {
            ...form,
            [name]: value,
        };
        setForm(newForm);
    }

    const handleSubmitForm = async(e) =>{
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:3001/users/login",{method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(form),
        });
        const data = await res.json();
        if(res.status === 200){
            setUser(data.user);
            navigate("/");
        } else{
            alert("Error at login1"+ data.message);
        }
        } catch(error){
            alert("Error at login");
            console.log(error);
        }
    }
    
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
                <input className="input-text" type="email" name="email" placeholder="Email" onChange ={(handleChange)}/>
            </label>
            <label className="input">
                <h2>Password</h2>
                <input className="input-text" type="password" name="password" placeholder="Password" onChange ={(handleChange)} />
            </label>
        </div>
        <div className="Button-container">
            <button className="Login-button" onClick={handleSubmitForm}>Sign In</button>
        </div>
        <div className = "create-acount">
            <p>
                Don't have an account? Create one <span className="highlight" onClick={() => navigate("/register")}>here</span>.
            </p>
        </div>
    </div>

    )
}

export default Form;