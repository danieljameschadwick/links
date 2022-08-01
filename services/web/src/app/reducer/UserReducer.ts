import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@src/app/store";
import { TokensInterface } from "@src/interfaces/TokensInterface";
import { UserInterface } from "@src/interfaces/UserInterface";

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
      state.tokens = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      const { id, username, name } = action.payload;

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