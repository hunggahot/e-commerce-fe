import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../state/Admin/Order/Action';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const OrdersTable = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log('admin orders ', adminOrder);

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Products" />
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>

              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder.orders?.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <AvatarGroup>
                    {item.orderItem.map((orderItem) => (
                      <Avatar src={item.imageUrl}></Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="left" scope="row">
                  {item.title}
                </TableCell>
                {/* <TableCell align="left">{item.category.name}</TableCell> */}
                <TableCell align="left">{item.totalPrice}</TableCell>
                {/* <TableCell align="left">{item.quantity}</TableCell> */}

                <TableCell align="left">
                  <Button
                    onClick={() => handleProductDelete(item.id)}
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
