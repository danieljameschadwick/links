import { UserInterface } from "@src/interfaces/UserInterface";

export const UserReducer = (
  state: { user: UserInterface | null, showSidebar: boolean },
  action: { type: string, payload: any | null }
) => {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        user: action.payload,
      };
    case "toggleSidebar":
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};
