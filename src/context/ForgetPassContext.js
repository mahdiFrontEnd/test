import React, { createContext } from 'react';

const ForgetPassStateContext = createContext();
const ForgetPassDispatchContext = createContext();

function ForgetPassReducer(state, action) {
  switch (action.type) {
    // SET STATE FUNCTION
    case 'SET_LOADER':
      return { ...state, loader: action.payload };
    case 'SET_DISPLAY_SEND_OTP':
      return { ...state, displaySendOTP: action.payload };
    case 'SET_DISPLAY_VERIFY_OTP':
      return { ...state, displayVerifyOTP: action.payload };
    case 'SET_DISPLAY_RESET_PASSWORD':
      return { ...state, displayResetPassword: action.payload };
    case 'SET_SAVE_MOBILE_NUM':
      return { ...state, saveMobileNum: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// store redux
function ForgetPassProvider({ children }) {
  const [state, dispatch] = React.useReducer(ForgetPassReducer, {
    loader: false,
    displaySendOTP: true,
    displayVerifyOTP: false,
    displayResetPassword: false,
    saveMobileNum: '',
  });
  return (
    <ForgetPassStateContext.Provider value={state}>
      <ForgetPassDispatchContext.Provider value={dispatch}>
        {children}
      </ForgetPassDispatchContext.Provider>
    </ForgetPassStateContext.Provider>
  );
}

// SHOW STATE
function useForgetPassState() {
  const context = React.useContext(ForgetPassStateContext);
  if (context === undefined) {
    throw new Error('useForgetPassState must be used within a ForgetPassProvider');
  }
  return context;
}

//CHANGE STATE USE SETSTATE
function useForgetPassDispatch() {
  const context = React.useContext(ForgetPassDispatchContext);
  if (context === undefined) {
    throw new Error('useForgetPassDispatch must be used within a ForgetPassProvider');
  }
  return context;
}

// SET STATE FUNCTION
// ###########################################################


function setDisplaySendOTP(dispatch, bool) {
  dispatch({
    type: 'SET_DISPLAY_SEND_OTP',
    payload: bool,
  });
}

function setDisplayVerifyOTP(dispatch, bool) {
  dispatch({
    type: 'SET_DISPLAY_VERIFY_OTP',
    payload: bool,
  });
}

function setDisplayResetPassword(dispatch, bool) {
  dispatch({
    type: 'SET_DISPLAY_RESET_PASSWORD',
    payload: bool,
  });
}

function setSaveMobileNum(dispatch, phone) {
  dispatch({
    type: 'SET_SAVE_MOBILE_NUM',
    payload: phone,
  });
}

export {
  ForgetPassProvider,
  useForgetPassState,
  useForgetPassDispatch,
  setDisplaySendOTP,
  setDisplayVerifyOTP,
  setDisplayResetPassword,
  setSaveMobileNum,
};
