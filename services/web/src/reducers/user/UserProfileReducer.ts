import { Reducer } from "react";
import { UserInterface } from "@links/types/interfaces/UserInterface";

type UserProfileState = {
  user?: UserInterface | null,
  showSidebar?: boolean
};

export enum UserProfileActionType {
  UPDATE_USER = "UPDATE_USER",
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
}

type UpdateUserAction = {
  type: UserProfileActionType.UPDATE_USER,
  payload: UserInterface,
};

type ToggleSidebarAction = {
  type: UserProfileActionType.TOGGLE_SIDEBAR,
  payload: { showSidebar: boolean },
};

type UserProfileReducerAction =
  | UpdateUserAction
  | ToggleSidebarAction
;

export const UserProfileReducer: Reducer<UserProfileState, UserProfileReducerAction> = (state, action) => {
  const { type, payload = null } = action;

  switch (type) {
    case UserProfileActionType.UPDATE_USER:
      return updateUser(state, payload);
    case UserProfileActionType.TOGGLE_SIDEBAR:
      return toggleSidebar(state, payload);
  }

  return state;
};

const updateUser = (state, user: UserInterface) => {
  return {
    ...state,
    user,
  };
};

const toggleSidebar = (state, payload: { showSidebar: boolean }) => {
  const { showSidebar } = payload;
  return {
    ...state,
    showSidebar,
  };
};
