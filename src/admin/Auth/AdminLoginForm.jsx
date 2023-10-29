import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../state/Admin/Auth/Action';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(adminLogin(userData));
    console.log('userData ', userData);
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      {/* Login component */}
      <div className="flex shadow-md">
        {/* Login form */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: '24rem', height: '32rem' }}
        >
          <div className="w-72">
            {/* Heading */}
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">
              Welcome back! Please enter your details
            </small>
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3 flex flex-wrap content-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-1 checked:bg-purple-700"
                />{' '}
                <label
                  htmlFor="remember"
                  className="mr-auto text-xs font-semibold"
                >
                  Remember for 30 days
                </label>
                <a href="#" className="text-xs font-semibold text-purple-700">
                  Forgot password?
                </a>
              </div>
              <div className="mb-3">
                <Button
                  type="submit"
                  className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* Login banner */}
        <div
          className="flex flex-wrap content-center justify-center rounded-r-md"
          style={{ width: '24rem', height: '32rem' }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="https://i.imgur.com/9l1A4OS.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
