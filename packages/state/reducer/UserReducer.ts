import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@links/state/store";
import { TokensInterface } from "@links/types/interfaces/TokensInterface";
import { UserInterface } from "@links/types/interfaces/UserInterface";

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
    setTokens: (state, action: PayloadAction<TokensInterface | null>) => {
      state.tokens = action.payload;
    },
    setStoreUser: (state, action: PayloadAction<UserInterface | null>) => {
      if (!action.payload) {
        state.user = null;

        return;
      }

      const { id, username, name } = action.payload;

      state.user = {
        id,
        username,
        name,
      };
    },
  },
});

export const { setTokens, setStoreUser } = userSlice.actions;

export const selectTokens = (state: AppState) => state.tokens;
export const selectStoreUser = (state: AppState) => state.user;

export default userSlice.reducer;