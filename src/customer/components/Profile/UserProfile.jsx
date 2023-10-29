import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../state/Auth/Action';

const UserProfile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(logout()); // You should dispatch a logout action here
    handleCloseUserMenu();
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <div>
      {auth.user?.firstName ? (
        <div>
          <Avatar
            className="text-white"
            onClick={handleUserClick}
            aria-controls="user-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            sx={{
              bgcolor: deepPurple[500],
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {auth.user?.firstName[0].toUpperCase()}
          </Avatar>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
            MenuListProps={{
              'aria-labelledby': 'user-menu',
            }}
          >
            <MenuItem onClick={() => navigate('/account/profile')}>
              Profile
            </MenuItem>

            <MenuItem onClick={() => navigate('/account/order')}>
              My Orders
            </MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button
          onClick={() => navigate('/signin')} // Redirect to the signin page
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Sign in
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
