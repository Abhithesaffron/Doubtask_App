import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../Context/AdminContext'; // Import the context for user login state
import './LoginSignup.css';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsUserLoggedIn } = useAdminContext(); // Access the context for user login state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userId', data.userId);

        // Set user login state to true
        setIsUserLoggedIn(true);

        // Navigate to the UserHomePage
        navigate('/user-home');

        alert('User login successful!');
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      alert('User login failed!');
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login as User</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="google-login">Login with Google</button>
    </div>
  );
};

export default LoginUser;