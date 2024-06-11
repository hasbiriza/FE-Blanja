import React from "react";
import { Grid, Container, Typography, FormControl, InputLabel, TextField, Button } from "@mui/material";

const SellingProduct = () => {
  return (
    <Grid item xs={4} className="bg-white p-4 rounded-lg shadow-md">
      <Typography variant="h5" className="font-bold mb-4">Inventory</Typography>
      <FormControl fullWidth className="mb-4">
        <InputLabel shrink htmlFor="seller_storename">Name of Goods</InputLabel>
        <TextField
          name="seller_storename"
          type="text"
          id="seller_storename"
          placeholder="Johanes Mikael"
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth className="mb-4">
        <InputLabel shrink htmlFor="seller_price">Price</InputLabel>
        <TextField
          name="seller_price"
          type="number"
          id="seller_price"
          placeholder="Rp 100.000"
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth className="mb-4">
        <InputLabel shrink htmlFor="seller_stock" >Stock</InputLabel>
        <TextField
          name="seller_stock"
          type="number"
          id="seller_stock"
          placeholder="10"
          fullWidth
        />
      </FormControl>
      <Button variant="contained" color="primary" fullWidth className="mb-4">
        Add Product
      </Button>
    </Grid>
  );
};

export default SellingProduct;