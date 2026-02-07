import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Dashboard Component ---
const Dashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <p>Welcome! You have successfully logged in.</p>
            <Link to="/login">Logout</Link>
        </div>
    );
};

// --- Login Component ---
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Updated to match your Spring Boot AuthController endpoint
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password
            });
            
            if (res.status === 200) {
                alert("Login Successful!");
                navigate('/dashboard');
            }
        } catch (err) {
            alert("Login Failed: " + (err.response?.data || "Server error"));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

// --- Register Component ---
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', {
                email: email,
                password: password
            });
            alert("Registered Successfully!");
            navigate('/login');
        } catch (err) {
            alert("Registration Failed: " + (err.response?.data || "Check Backend"));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br/>
                <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

// --- Main App Component ---
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;