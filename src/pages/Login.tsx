import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isRegister ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        setMessage(isRegister ? 'Registration successful!' : 'Login successful!');
        window.location.href = isRegister ? '/login' : '/suppliers';
      } else {
        setMessage('Authentication failed.');
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-indigo-500 ">
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isRegister ? 'Create an Account' : 'Welcome Back!'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition duration-300"
            >
              {isRegister ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="w-full py-2 mt-4 text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300"
          >
            {isRegister ? 'Already have an account? Log In' : 'New here? Create an Account'}
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;