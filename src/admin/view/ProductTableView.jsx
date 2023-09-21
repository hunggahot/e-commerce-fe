import {
  Avatar,
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
import React, { useEffect } from 'react';
import { findProducts } from '../../state/Product/Action';
import { useDispatch, useSelector } from 'react-redux';

const ProductsTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  useEffect(() => {
    const data = {
      category: 'tops',
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 0,
      pageSize: 5,
      stock: '',
    };
    dispatch(findProducts(data));
  }, [products.deletedProduct]);

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Recent Products" />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.products?.content?.slice(0, 5).map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Avatar src={item.imageUrl}></Avatar>
                </TableCell>
                <TableCell align="left" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="left">{item.category?.name}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsTableView;
