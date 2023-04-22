import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../reducerLoginForm";

export default function LoginForm(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); 
  
  const status = useSelector((state) => state.loginForm.status);

  const navigate = useNavigate();

  const checkStatus = () =>{
    console.log(status);
      if (status === "admin") {
        console.log('//admin');
        navigate("/loggedin/admin");
      } else if (status === "user") {
        console.log('//user');
        navigate("/loggedin/user");
      }else {
        navigate("/login")
      }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLoginForm({ email, password }))
  };

  useEffect(()=>{
    checkStatus();
  },[status])

    return (
      <>
      <a link="/register">Link Text</a>
        <Link Link to="/register">
          <button>Register</button>
        </Link>
          <hr/>
        <form>
          <h2>Log in</h2>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          {/* <p>{data}</p> */}
          <button onClick={handleSubmit}>Submit</button>
          <hr/>
          <p>admin:  email: "mariam@mail.com",  password: "Mariam27" <br/>user:  email: "hasmik@mail.com", password: "Hasmik22"</p>
        </form>
      </>
      );
};