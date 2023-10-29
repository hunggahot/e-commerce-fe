import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../state/Admin/Customer/Action';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const CustomerTable = () => {
  const [anchorEl, setAnchorEl] = useState([]);
  const { customers } = useSelector((store) => store);

  const handleClick = (e, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = e.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const dispatch = useDispatch();

  const { adminCustomer } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log('admin customers', adminCustomer);

  return (
    <div className="p-10">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Customers" />
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Addresses</TableCell>
              <TableCell align="left">Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.users?.map((customer, index) => (
              <TableRow
                key={customer.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="" className="">
                  <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                    {/* You can add Avatars here based on the customer's image */}
                    {/* For example: <Avatar src={customer.image}></Avatar> */}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="left" scope="row">
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="left">{customer.mobile}</TableCell>
                <TableCell align="left">
                  {/* You can map through addresses and display them */}
                  {customer.addresses.map((address, addressIndex) => (
                    <div key={addressIndex}>
                      {address.streetAddress}, {address.city}, {address.state},{' '}
                      {address.zipCode}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="left">
                  {/* Map through roles and display them */}
                  {customer.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>{role.name}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerTable;
