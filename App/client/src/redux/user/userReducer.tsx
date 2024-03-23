import { SET_LOCATION } from './userActions';

const initialState = {
  location: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
