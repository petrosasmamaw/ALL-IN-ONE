import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SELLERAPI_URL = 'http://localhost:5000/api/sellers/';

export const fetchAllSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async () => {
    const response = await axios.get(SELLERAPI_URL);
    return response.data;
  }
);

export const createSeller = createAsyncThunk(
  'sellers/createSeller',
  async (sellerData) => {
    let dataToSend = sellerData;

    if (sellerData.image instanceof File) {
      const formData = new FormData();
      formData.append('name', sellerData.name);
      formData.append('userId', sellerData.userId);
      formData.append('phone', sellerData.phone);
      formData.append('category', sellerData.category);
      formData.append('status', sellerData.status);
      formData.append('image', sellerData.image);
      dataToSend = formData;
    }

    const response = await axios.post(SELLERAPI_URL, dataToSend);
    return response.data;
  }
);

export const updateSeller = createAsyncThunk(
  'sellers/updateSeller',
  async ({ id, sellerData }) => {
    let dataToSend = sellerData;

    if (sellerData.image instanceof File) {
      const formData = new FormData();
      formData.append('name', sellerData.name);
      formData.append('userId', sellerData.userId);
      formData.append('phone', sellerData.phone);
      formData.append('category', sellerData.category);
      formData.append('status', sellerData.status);
      formData.append('image', sellerData.image);
      dataToSend = formData;
    }

    const response = await axios.put(`${SELLERAPI_URL}${id}`, dataToSend);
    return response.data;
  }
);

export const fetchSellerByUserId = createAsyncThunk(
  'sellers/fetchSellerByUserId',
  async (userId) => {
    const response = await axios.get(`${SELLERAPI_URL}user/${userId}`);
    return response.data;
  }
);

export const deleteSeller = createAsyncThunk(
  'sellers/deleteSeller',
  async (id) => {
    await axios.delete(`${SELLERAPI_URL}${id}`);
    return id;
  }
);

const sellersSlice = createSlice({
  name: 'sellers',
  initialState: {
    sellers: [],
    seller: null,
    status: 'idle',
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createSeller.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellers.push(action.payload);
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateSeller.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.sellers.findIndex(
          (seller) => seller._id === action.payload._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        if (state.seller?._id === action.payload._id) {
          state.seller = action.payload;
        }
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchSellerByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seller = action.payload;
      })
      .addCase(fetchSellerByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteSeller.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellers = state.sellers.filter(
          (seller) => seller._id !== action.payload
        );
        if (state.seller?._id === action.payload) {
          state.seller = null;
        }
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sellersSlice.reducer;
