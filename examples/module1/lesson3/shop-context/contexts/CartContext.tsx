import { createContext, useCallback, useMemo, useState } from 'react';
import type { CartItem } from '../types/CartItem';
import type { Product } from '../types/Product';

type CartContextType = {
  cart: CartItem[];
  itemAmount: number;
  total: number;
  addToCart: (product: Product | CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  decreaseAmount: (id: number) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType // typescript hack to avoid initializing context with undefined, use this context only with a provider
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product | CartItem) => {
    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.id === product.id);

      if (cartItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
      }

      const newItem = { ...product, amount: 1 };
      return [...currentCart, newItem];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => {
        return item.id !== id;
      })
    );
  }, []);

  const decreaseAmount = useCallback((id: number) => {
    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.id === id);

      if (!cartItem) {
        return currentCart;
      }

      if (cartItem.amount <= 1) {
        return currentCart.filter((item) => item.id !== id);
      }

      return currentCart.map((item) =>
        item.id === id ? { ...item, amount: cartItem.amount - 1 } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const { totalPrice, itemAmount } = useMemo(() => {
    return cart.reduce(
      (accumulator, item) => {
        return {
          totalPrice: accumulator.totalPrice + item.price * item.amount,
          itemAmount: accumulator.itemAmount + item.amount,
        };
      },
      { totalPrice: 0, itemAmount: 0 }
    );
  }, [cart]);

  const value = useMemo(() => {
    return {
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      decreaseAmount,
      itemAmount,
      total: totalPrice,
    };
  }, [
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    decreaseAmount,
    itemAmount,
    totalPrice,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
