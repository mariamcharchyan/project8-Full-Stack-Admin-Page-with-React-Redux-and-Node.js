import './LoggedInUser.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../reducerLoginForm";

export default function LoggedInUser(){
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/login")
    }
    return (
        <>
        <h1 className="welcome-message">Welcome User!</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    );
};