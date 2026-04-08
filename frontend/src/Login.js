import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/register', { username, password, email });
        alert('Registered successfully');
        setIsRegister(false);
      } else {
        const res = await axios.post('http://localhost:5000/login', { username, password });
        localStorage.setItem('token', res.data.token);
        setUser(username);
      }
    } catch (err) {
      alert('Error: ' + err.response.data);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0f2027, #2c5364, #1c92d2)'
    }}>

      {/* Glass Card */}
      <div style={{
        backdropFilter: 'blur(15px)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        width: '320px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff'
      }}>

        <h1 style={{
          marginBottom: '10px',
          letterSpacing: '1px'
        }}>
          AdFlow Pro 🚀
        </h1>

        <p style={{
          fontSize: '14px',
          opacity: 0.8
        }}>
          Smart Ad Management System
        </p>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '25px',
            borderRadius: '12px',
            border: 'none',
            outline: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: '14px'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '15px',
            borderRadius: '12px',
            border: 'none',
            outline: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: '14px'
          }}
        />

        {isRegister && (
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              borderRadius: '12px',
              border: 'none',
              outline: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: '25px',
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f260, #0575e6)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s'
          }}

          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 0 15px #00f260';
          }}

          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{
            marginTop: '15px',
            cursor: 'pointer',
            opacity: 0.8
          }}
        >
          {isRegister ? 'Already have an account? Login' : 'New user? Register'}
        </p>

      </div>
    </div>
  );
}

export default Login;