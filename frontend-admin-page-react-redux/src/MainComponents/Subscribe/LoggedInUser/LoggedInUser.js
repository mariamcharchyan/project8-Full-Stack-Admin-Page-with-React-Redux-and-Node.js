import './LoggedInUser.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../reducerLoginForm";
import { useState, useEffect } from 'react';

export default function LoggedInUser(){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    //for Get Products data
    const [userData, setUserData] = useState([]);

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(fetchLoginForm(null, null));
        localStorage.clear();
        navigate("/login");
    }

    useEffect(()  => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${accessToken}`
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
                const newData= {
                image: data.image,
                name: data.name,
                surename: data.surename,
                email: data.email,
                gender: data.gender,
                age: data.age
                };
            console.log(newData);
            setUserData(newData);
        })
        .catch((error) => {
            // setError(`Error: ${error}`)
            console.error('Error:', error);
        });
    
},[]);
    return (
        <div className='userPart'>
            <div className="userWelcomeMessage">
                <div></div>
                <h1>Welcome User!</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='userData'>
                <div className='userInage'>
                    <img src={userData.image} alt="User Image" />
                </div>
                <div className='userDataRight'>
                    <div><p className='p1'>Name: </p><p className='p2'>{userData.name}</p></div>
                    <div><p className='p1'>Surename: </p><p className='p2'>{userData.surename}</p></div>
                    <div><p className='p1'>Email: </p><p className='p2'>{userData.email}</p></div>
                    <div><p className='p1'>Gender: </p><p className='p2'>{userData.gender}</p></div>
                    <div><p className='p1'>Age: </p><p className='p2'>{userData.age}</p></div>
                </div>
            </div>
        </div>
    );
};