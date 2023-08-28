import { Grid, TextField } from '@mui/material';
import React from 'react';

const RegisterForm = () => {
  const handleSubmit = () => {};

  return (
    <div>
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
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterForm;
