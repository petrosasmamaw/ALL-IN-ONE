import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHATAPI_URL = "http://localhost:5000/api/chats/";

export const fetchChatsByItemId = createAsyncThunk(   "chats/fetchChatsByItemId",
  async (itemId) => {
    const response = await axios.get(`${CHATAPI_URL}item/${itemId}`);
    return response.data;
  }
);

export const fetchChatById = createAsyncThunk(  "chats/fetchChatById",
  async (id) => {
    const response = await axios.get(`${CHATAPI_URL}${id}`);
    return response.data;
  }
);

export const fetchChatBySellerIdAndClientId = createAsyncThunk(   "chats/fetchChatBySellerIdAndClientId",
  async ({ sellerId, clientId }) => {
    const response = await axios.get(
      `${CHATAPI_URL}seller/${sellerId}/client/${clientId}`
    );
    return response.data;
  }
);

export const createChat = createAsyncThunk(   "chats/createChat",
  async (chatData) => {
    const response = await axios.post(CHATAPI_URL, chatData);
    return response.data;
  }
);

export const deleteChat = createAsyncThunk(   "chats/deleteChat",
  async (chatId) => {
    await axios.delete(`${CHATAPI_URL}${chatId}`);
    return chatId;
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    chat: null,
    status: "idle",
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsByItemId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatsByItemId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
      })
      .addCase(fetchChatsByItemId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchChatBySellerIdAndClientId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatBySellerIdAndClientId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chat = action.payload;
      })
      .addCase(fetchChatById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chat = action.payload;
      })
      .addCase(fetchChatBySellerIdAndClientId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = state.chats.filter(
          (chat) => chat._id !== action.payload
        );
        if (state.chat?._id === action.payload) {
          state.chat = null;
        }
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
