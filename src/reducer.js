import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = (
  { reducer, initialState, children } // Corrected 'childern' to 'children'
) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); // Corrected to useStateValue, as you defined it this way
export const initialState = {
  user: null,
};
export const actionType = {
  SET_USER: "SET_USER",
};
export const reducer = (state, action) => {
  // Changed 'const reducer' to 'export const reducer'
  console.log(action);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
