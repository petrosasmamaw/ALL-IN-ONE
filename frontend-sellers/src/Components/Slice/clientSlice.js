import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CLIENTAPI_URL = 'http://localhost:5000/api/clients/';

export const fetchAllClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await axios.get(CLIENTAPI_URL);
    return response.data;
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData) => {
    let dataToSend = clientData;

    if (clientData.image instanceof File) {
      const formData = new FormData();
      formData.append('name', clientData.name);
      formData.append('userId', clientData.userId);
      formData.append('phoneNo', clientData.phoneNo);
      formData.append('status', clientData.status);
      formData.append('image', clientData.image);
      dataToSend = formData;
    }

    const response = await axios.post(CLIENTAPI_URL, dataToSend);
    return response.data;
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, clientData }) => {
    let dataToSend = clientData;

    if (clientData.image instanceof File) {
      const formData = new FormData();
      formData.append('name', clientData.name);
      formData.append('userId', clientData.userId);
      formData.append('phoneNo', clientData.phoneNo);
      formData.append('status', clientData.status);
      formData.append('image', clientData.image);
      dataToSend = formData;
    }

    const response = await axios.put(`${CLIENTAPI_URL}${id}`, dataToSend);
    return response.data;
  }
);

export const fetchClientByUserId = createAsyncThunk(
  'clients/fetchClientByUserId',
  async (userId) => {
    const response = await axios.get(`${CLIENTAPI_URL}user/${userId}`);
    return response.data;
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id) => {
    await axios.delete(`${CLIENTAPI_URL}${id}`);
    return id;
  }
);

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    client: null,
    status: 'idle',
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createClient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateClient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.clients.findIndex(
          (client) => client._id === action.payload._id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
        if (state.client?._id === action.payload._id) {
          state.client = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchClientByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.client = action.payload;
      })
      .addCase(fetchClientByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteClient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload
        );
        if (state.client?._id === action.payload) {
          state.client = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
