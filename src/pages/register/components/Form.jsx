import {useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../images/wizeline-sin-fondo.png';


const Form = () =>{

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newForm = {
            ...form,
            [name]: value,
        };
        setForm(newForm);
    };

    const handelSubmitForm = async (e) =>{
        e.preventDefault();

        if(form.password !== form.confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try{
            const res = await fetch("http://localhost:3001/users",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if(res.status === 200){
                alert("User created");
                navigate("/login");
            }else{
                alert("Error creating user");
            }
        }catch(error){
            alert("Error creating user");
            console.log(error);
        }
    }

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
                <input className="input-text" type="text" name="name" placeholder="Name" onChange ={(handleChange)}/>
            </label>
            <label className="input">
                <h2>Email</h2>
                <input className="input-text" type="email" name="email" placeholder="Email" onChange ={(handleChange)}/>
            </label>
            <label className="input">
                <h2>Password</h2>
                <input className="input-text" type="password" name="password" placeholder="Password" onChange ={(handleChange)}/>
            </label>
            <label className="input">
                <h2>Confirm Password</h2>
                <input className="input-text" type="password" name="confirmPassword" placeholder="Password" onChange ={(handleChange)}/>
            </label>
            <label className="checkbox">
                <input className="input-checkbox" type="checkbox" name="terms"/>
                <span>I agree with the terms and conditions of Service</span>
            </label>
        </div>

        <button className="Register-button" onClick={handelSubmitForm}>Create account</button>
        </div>
    );
}

export default Form;