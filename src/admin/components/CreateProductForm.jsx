import { Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/Product/Action';
import { Fragment } from 'react';

const initialSizes = [
  { name: 'S', quantity: 0 },
  { name: 'M', quantity: 0 },
  { name: 'L', quantity: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: '',
    brand: '',
    title: '',
    color: '',
    discountedPrice: '',
    price: '',
    discountePercent: '',
    size: initialSizes,
    quantity: '',
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
    description: '',
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === 'size_quantity' ? (name = 'quantity') : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ data: productData }));
    console.log(productData);
  };

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center' }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
