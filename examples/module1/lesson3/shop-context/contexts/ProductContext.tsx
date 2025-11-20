import { createContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });
        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const value = useMemo(() => ({ products }), [products]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
