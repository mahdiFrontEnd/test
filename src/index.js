import React from 'react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ForgetPassProvider } from './context/ForgetPassContext';
import { store } from './store/Store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


root.render(
  <Provider store={store}>
    <ForgetPassProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ForgetPassProvider>
  </Provider>,
);
