import { configureStore } from '@reduxjs/toolkit';

import cartReducer, { type CartState } from './state/cartSlice';
import { productsApi } from './services/productsApi';

const CART_STORAGE_KEY = 'cart';

const isBrowser = typeof window !== 'undefined';

const loadCartState = (): CartState | undefined => {
  if (!isBrowser) {
    return undefined;
  }
  try {
    const serializedState = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState) as CartState;
  } catch (error) {
    console.warn('Failed to load cart state', error);
    return undefined;
  }
};

const saveCartState = (state: CartState) => {
  if (!isBrowser) {
    return;
  }
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save cart state', error);
  }
};

const preloadedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  preloadedState: preloadedCartState
    ? {
        cart: preloadedCartState,
      }
    : undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
