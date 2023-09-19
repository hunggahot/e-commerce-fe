import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { deleteProduct, findProducts } from '../../state/Product/Action';
import { useDispatch, useSelector } from 'react-redux';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  console.log('products --- ', products);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

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
      {/* File input for Excel import */}
      <Input type="file" accept=".xlsx" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleImportClick}>
        Import Excel
      </Button>

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
            {products?.products?.content?.map((item) => (
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
                <TableCell align="left">{item.category.name}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>

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

export default ProductsTable;
