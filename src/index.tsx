import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import AppGuide from './AppGuide';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles/icomoon/style.css';
import './styles/all.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

const showSchool = true;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {showSchool && <App /> }
      {!showSchool && <AppGuide /> }
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
