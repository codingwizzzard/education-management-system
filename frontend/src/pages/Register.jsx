import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      name: name,
      email,
      password,
      role, 
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      if (response.data) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth-main relative">
      <div className="auth-wrapper v2 flex items-center w-full h-full min-h-screen">
        
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen bg-cover relative p-6 bg-theme-cardbg dark:bg-themedark-cardbg">
          <div className="card sm:my-12 w-full max-w-[480px] border-none shadow-none">
            <div className="card-body sm:!p-10">
              
              <h4 className="text-center font-medium mb-4">Create an Account</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Select Role</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                
                <div className="flex mt-1 justify-between items-center flex-wrap">
                  
                </div>
                
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary w-full">Sign up</button> 
                </div>
              </form>
              
              <div className="flex justify-between items-end flex-wrap mt-4">
                <h6 className="f-w-500 mb-0">Already have an Account?</h6>
                <a href="/login" className="text-primary-500">Login here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
