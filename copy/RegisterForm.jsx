import { Grid, TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../state/Auth/Action';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(register(userData));

    console.log('userData ', userData);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <Grid container spacing={3}>
          {/* Left side (image) */}
          <Grid item xs={12} sm={6}>
            <img
              src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2023/05/17/b530a02260b03cecd01b1ace2210a30d.jpg"
              alt="Registration Image"
              className="w-full h-auto"
            />
          </Grid>

          {/* Right side (form) */}
          <Grid item xs={12} sm={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    autoComplete="password"
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className="w-full"
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ padding: '.8rem 0', width: '100%' }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>

            <div className="flex justify-center flex-col items-center">
              <div className="py-3 flex items-center">
                <p>if you have already an account?</p>
                <Button
                  onClick={() => navigate('/login')}
                  className="ml-5"
                  size="small"
                >
                  Login
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterForm;
