import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import {Provider} from "react-redux"
import { store,persister } from './store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
        <ToastContainer/>
      </PersistGate>
    </Provider>
  </>
);


