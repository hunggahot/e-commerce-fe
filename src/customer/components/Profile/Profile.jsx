import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { getUser, updateUserProfile } from '../../../state/Auth/Action';

const Profile = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector((store) => store);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    console.log('User Data:', auth.user);

    setUpdatedUser(auth.user);
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Debugging: Check if updateUserProfile action is being called
      console.log('Updating Profile:', updatedUser);

      dispatch(updateUserProfile(jwt, updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {jwt ? (
        <>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={updatedUser.firstName || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={updatedUser.lastName || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  name="email"
                  value={updatedUser.email || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Add other user profile fields here */}
              <div>
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          ) : (
            <div>
              {auth.user ? (
                <>
                  <p>First Name: {auth.user.firstName}</p>
                  <p>Last Name: {auth.user.lastName}</p>
                  <p>Email: {auth.user.email}</p>
                  {/* Display other user profile fields here */}
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
