import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../store";
import { TokensInterface } from "../../interfaces/TokensInterface";
import { UserInterface } from "../../interfaces/UserInterface";

interface PartialUserInterface {
  id: number;
  username: string;
  name: string;
}

export interface UserState {
  user: PartialUserInterface | null,
  tokens: TokensInterface | null,
  status: "idle" | "loading" | "failed",
}

const initialState: UserState = {
  user: null,
  tokens: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokensInterface>) => {
      console.log('setTokens');

      state.tokens = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      const { id, username, name } = action.payload;

      console.log('setUser');

      state.user = {
        id,
        username,
        name,
      };
    },
  },
});

export const { setTokens, setUser: setStoreUser } = userSlice.actions;

export const selectTokens = (state: AppState) => state.tokens;
export const selectStoreUser = (state: AppState) => state.user;

export default userSlice.reducer;