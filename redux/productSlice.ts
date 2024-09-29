import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

interface ProductState {
  products: Product[];
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  totalPages: 0,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, category, search }: { page: number; category: string | null; search: string }) => {
    const limit = 10; // limit set to 10
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
    
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`;
    }
    
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${(page - 1) * limit}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.totalPages = Math.ceil(action.payload.total / 10);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectTotalPages = (state: RootState) => state.products.totalPages;

export default productSlice.reducer;