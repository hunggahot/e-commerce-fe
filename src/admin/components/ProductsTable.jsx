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
import React, { useEffect, useState } from 'react';
import {
  deleteProduct,
  findProducts,
  importProducts,
} from '../../state/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const seletedFile = e.target.files[0];
    setFile(seletedFile);
  };

  const handleImportClick = () => {
    if (file) {
      // Read the uploaded Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet in the Excel file contains your data
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Dispatch the importProducts action with the imported data
        dispatch(importProducts(importedData));

        // Handle the imported data as needed (e.g., send it to the server)
        console.log('Imported data:', importedData);
      };

      reader.readAsArrayBuffer(file);
    } else {
      // Handle no file selected
      console.log('No file selected for import.');
    }
  };

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
      <Input
        type="file"
        accept=".xlsx"
        name="file"
        onChange={handleFileChange}
      />
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
                <TableCell align="left">{item.category?.name}</TableCell>
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
