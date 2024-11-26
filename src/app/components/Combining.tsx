"use client"
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  description: string;
  name: string;
  // Add other properties based on your JSON structure
};

const Combining = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://siemseko.github.io/beta/database/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Combining;
