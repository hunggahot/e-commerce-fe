import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { updateUserProfile } from '../../../state/Auth/Action';

const Profile = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        {user ? (
          <>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={updatedUser.firstName || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={updatedUser.lastName || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Email"
                    name="email"
                    value={updatedUser.email || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                {/* Add other user profile fields here */}
                <div className="mt-4">
                  <Button variant="contained" color="primary" type="submit">
                    Save Profile
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <>
                  <p className="mb-2">
                    <span className="font-semibold">First Name:</span>{' '}
                    {user.firstName}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Last Name:</span>{' '}
                    {user.lastName}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  {/* Display other user profile fields here */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </>
              </div>
            )}
          </>
        ) : (
          <p className="text-red-500">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
