import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTHAPI_URL = "http://localhost:5000/api/auth/";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(`${AUTHAPI_URL}register`, userData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await axios.post(`${AUTHAPI_URL}login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    await axios.post(`${AUTHAPI_URL}logout`, {}, { withCredentials: true });
  }
);

export const fetchSession = createAsyncThunk(
  "auth/fetchSession",
  async () => {
    const response = await axios.get(`${AUTHAPI_URL}session`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await axios.post(`${AUTHAPI_URL}forgot-password`, { email });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    forgotPasswordStatus: "idle",
    forgotPasswordMessage: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearForgotPassword: (state) => {
      state.forgotPasswordStatus = "idle";
      state.forgotPasswordMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordStatus = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordStatus = "succeeded";
        state.forgotPasswordMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.forgotPasswordMessage = action.error.message;
      });
  },
});

export const { clearAuthError, clearForgotPassword } = authSlice.actions;
export default authSlice.reducer;
