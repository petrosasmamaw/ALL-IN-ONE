import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import sellersReducer from "./Slice/sellersSlice";
import itemsReducer from "./Slice/itemSlice";
import idReducer from "./Slice/idSlice";
import chatReducer from "./Slice/chatSlice";
import clientReducer from "./Slice/clientSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellersReducer,
    items: itemsReducer,
    ids: idReducer,
    chats: chatReducer,
    clients: clientReducer,
  },
});

export default store;