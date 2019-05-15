import { SET_USER, GET_AUTH_ERRORS, CLEAR_AUTH_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated:
          Object.keys(action.payload).length === 0 ? false : true,
        user: action.payload
      };
    case GET_AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
}
