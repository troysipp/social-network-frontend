import { CREATE_USER } from "../constants/users";

const DEFAULT_STATE = {
  currentUser: {}
};

export default function usersReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
