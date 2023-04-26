import './Register.css';
import {Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send registration data to the server and handle response
  };

  return (
    <div className='containerRegister'>
      <div className="register">
        <h2>Register</h2>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="text"
            value={surename}
            placeholder="Surename"
            onChange={(event) => setSurename(event.target.value)}
          />
        </div><br/>
        <div>
              <input
              type="number"
              value={age}
              placeholder="Age"
              onChange={(event) => setAge(event.target.value)}
              />
        </div>
        <br/>
        <div>
          <input
            type="text"
            value={gender}
            placeholder="Gender"
            onChange={(event) => setGender(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div><br/>
        <div className='errorMesage'>
              <p>errorMesage</p>
            </div>
        <button className='register-Button'>Register</button><br/>
          <div className='loginP'><p>—————— There is profile ——————</p></div>
          <Link Link to="/login">
            <button className='login-Button'>Log in</button>
          </Link>
      </div>
    </div>
  );
}