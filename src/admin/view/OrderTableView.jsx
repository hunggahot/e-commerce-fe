import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../state/Admin/Order/Action';
import {
  Avatar,
  AvatarGroup,
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

const OrdersTableView = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deletedOrder,
  ]);

  console.log('admin orders ', adminOrder);

  return (
    <div className="p-10">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Recent Orders" />
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder.orders?.map((item, index) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="" className="">
                  <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                    {item.orderItems?.map((orderItem) => (
                      <Avatar src={orderItem.product.imageUrl}></Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="left" scope="row">
                  {item.orderItems?.map((orderItem) => (
                    <p>{orderItem.product.title}</p>
                  ))}
                  {/* {item.title} */}
                </TableCell>
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.totalPrice}</TableCell>
                <TableCell align="left">
                  <span
                    className={`text-white px-5 py-2 rounded-full 
                ${
                  item.orderStatus === 'CONFIRMED'
                    ? 'bg-[#369236]'
                    : item.orderStatus === 'SHIPPED'
                    ? 'bg-[#4141ff]'
                    : item.orderStatus === 'PLACED'
                    ? 'bg-[#02B290]'
                    : item.orderStatus === 'PENDING'
                    ? 'bg-[gray]'
                    : 'bg-[#015720]'
                }`}
                  >
                    {' '}
                    {item.orderStatus}
                  </span>{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTableView;
