import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../user";

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>("users");

export const getmaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "MASK_USER_NAME":
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
