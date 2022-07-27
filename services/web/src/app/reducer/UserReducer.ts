import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserInterface } from "@src/interfaces/UserInterface";
import { AppState } from "@src/app/store";
import { TokensInterface } from "@src/interfaces/TokensInterface";

export interface UserState {
  user: UserInterface | null,
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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTokens: (state, action: PayloadAction<TokensInterface>) => {
      state.tokens = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    },
  },
});

export const { setTokens, setUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;