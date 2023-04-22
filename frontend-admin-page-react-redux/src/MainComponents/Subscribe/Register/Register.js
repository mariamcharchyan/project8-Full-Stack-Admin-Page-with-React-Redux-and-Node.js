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
    <form className="register-form" onSubmit={handleSubmit}>
        <Link Link to="/login">
          <button>Log in</button>
        </Link>
          <hr/>
      <h2>Register</h2>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br/>
      <label>
        Surename:
        <input
          type="text"
          value={surename}
          onChange={(event) => setSurename(event.target.value)}
        />
      </label>
      <br/>
      <label>
        Age:
            <input
            type="email"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            />
      </label>
      <br/>
      <label>
      Gender:
        <input
          type="email"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </label>
      <br/>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br/>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br/>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <br/>
      <button type="submit">Register</button>
    </form>
  );
}