import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isRegister, setIsRegister] = useState(true);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? 'http://localhost:5000/api/user/register' : 'http://localhost:5000/api/user/login';

  try {
    const res = await axios.post(endpoint, formData);
    const data = res.data;
    

    if (data.success) {
      if (data.token) {
        localStorage.setItem('userToken', data.token); // Save user ID
        localStorage.setItem("userName",data.user.name)
      }
      // navigate('/dashboard');
      alert( isRegister ? 'Registration successful!' : 'Login successful!');
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error('Axios error:', err);
    alert('Server error');
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-image" />
        <div className="register-form">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>
          <p>{isRegister ? 'Create your account' : 'Sign in to your account'}</p>

          <form onSubmit={handleSubmit}>
            {isRegister ?
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              : null}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          </form>

          <p className="toggle-text">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsRegister(prev => !prev)}>
              {isRegister ? 'Login here' : 'Register here'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
