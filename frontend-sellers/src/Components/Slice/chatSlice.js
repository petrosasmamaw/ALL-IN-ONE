import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CLIENTAPI_URL = "http://localhost:5000/api/chats/";


export const fetchAllChats = createAsyncThunk(  
    "chats/fetchAllChats",
    async () => {
        const response = await axios.get(CLIENTAPI_URL);
        return response.data;
    }
);

export const fetchChatByItemClientSeller = createAsyncThunk(
    "chats/fetchChatByItemClientSeller",
    async ({ itemId, clientId, sellerId }) => {
        const response = await axios.get(`${CLIENTAPI_URL}${itemId}/${clientId}/${sellerId}`);
        return response.data;
    }
);
export const fetchChatsBySellerId = createAsyncThunk(
    "chats/fetchChatsBySellerId",
    async (sellerId) => {
        const response = await axios.get(`${CLIENTAPI_URL}seller/${sellerId}`);
        return response.data;
    }
);

export const fetchChatsByClientId = createAsyncThunk(
    "chats/fetchChatsByClientId",
    async (clientId) => {
        const response = await axios.get(`${CLIENTAPI_URL}client/${clientId}`);
        return response.data;
    }
);
export const createChat = createAsyncThunk(
    "chats/createChat",
    async (chatData) => {
        const response = await axios.post(CLIENTAPI_URL, chatData);
        return response.data;
    }
);

export const deleteChat = createAsyncThunk(
    "chats/deleteChat",
    async (id) => {
        await axios.delete(`${CLIENTAPI_URL}${id}`);
        return id;
    }
);