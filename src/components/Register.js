// Import necessary React and Axios libraries
import React, { useState } from 'react';
import axios from 'axios';

// Define a functional component named Register
function Register() {
  // This is like a personal notepad, where you keep the username, email, and password
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  // This is like an action plan that gets activated when you submit the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // This stops the page from refreshing
    try {
      // Try to send the notepad contents to the clubhouse server
      await axios.post('http://localhost:3001/api/auth/register', userData);
      alert('User registered successfully'); // A happy message if it works
    } catch (error) {
      alert('Failed to register'); // A sad message if it doesn't work
    }
  };

  // This part describes what the registration form looks like
  return (
    <form onSubmit={handleSubmit}>
      {/* Each of these is like a question asking for your name, email, and secret password */}
      <label>Name:</label>
      <input type="text" name="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
      <label>Email:</label>
      <input type="email" name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <label>Password:</label>
      <input type="password" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

      {/* This is the button you press when you're ready to submit your answers */}
      <button type="submit">Sign Up</button>
    </form>
  );
}

// Make sure other parts of your app know that this form exists
export default Register;
