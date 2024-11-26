"use client"
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface Product {
  name: string;
  price: number;
  qty: number;
  image: File | null; // Added image property
}

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({ name: '', price: 0, qty: 0, image: null });
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setProduct((prev) => ({ ...prev, image: e.target.files ? e.target.files[0] : null }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: name === 'price' || name === 'qty' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('qty', product.qty.toString());
    if (product.image) {
      formData.append('image', product.image); // Add image file to FormData
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/create`, {
        method: 'POST',
        body: formData, // Send FormData instead of JSON
      });

      if (response.ok) {
        const data = await response.json(); // Expecting a JSON response
        setResponseMessage(data.message);
      } else {
        setResponseMessage('Failed to add product');
      }
    } catch (error) {
      setResponseMessage('Error adding product');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
          <TextField
            id="outlined-basic"
            label="ឈ្មោះផលិតផល"
            variant="outlined"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="តម្លៃ"
            variant="outlined"
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required // Optional: Make it required if an image is necessary
          />
        </div>
        <Button variant="contained" color="success" type="submit">
        បង្កើត
        </Button>
        
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ProductForm;
