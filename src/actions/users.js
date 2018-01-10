import { CREATE_USER } from "../constants/users";

export function createUser(email, username) {
  return {
    type: CREATE_USER,
    payload: {
      email,
      username
    }
  };
}
