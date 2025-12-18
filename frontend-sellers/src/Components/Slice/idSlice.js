import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IDAPI_URL = "http://localhost:5000/api/ids/";

export const fetchAllIds = createAsyncThunk(   "ids/fetchIds",
  async () => {
    const response = await axios.get(IDAPI_URL);
    return response.data;
  }
);

export const createIds = createAsyncThunk(  "ids/createIds",
  async (idsData) => {
    const response = await axios.post(IDAPI_URL, idsData);
    return response.data;
  }
);

export const fetchIdsBySellerId = createAsyncThunk(  "ids/fetchIdsBySellerId",
  async (sellerId) => {
    const response = await axios.get(`${IDAPI_URL}seller/${sellerId}`);
    return response.data;
  }
);

export const fetchIdsByClientId = createAsyncThunk(  "ids/fetchIdsByClientId",
  async (clientId) => {
    const response = await axios.get(`${IDAPI_URL}client/${clientId}`);
    return response.data;
  }
);

export const deleteIds = createAsyncThunk(  "ids/deleteIds",
  async (id) => {
    await axios.delete(`${IDAPI_URL}${id}`);
    return id;
  }
);

const idsSlice = createSlice({
  name: "ids",
  initialState: {
    ids: [],
    id: null,
    status: "idle",
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ids = action.payload;
      })
      .addCase(fetchAllIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ids.push(action.payload);
      })
      .addCase(createIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchIdsBySellerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdsBySellerId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ids = action.payload;
      })
      .addCase(fetchIdsBySellerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchIdsByClientId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdsByClientId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ids = action.payload;
      })
      .addCase(fetchIdsByClientId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ids = state.ids.filter(
          (item) => item._id !== action.payload
        );
        if (state.id?._id === action.payload) {
          state.id = null;
        }
      })
      .addCase(deleteIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default idsSlice.reducer;
