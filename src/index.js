import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const { NODE_ENV } = process.env;
const IS_DEVELOPMENT = NODE_ENV === 'development';

if (IS_DEVELOPMENT) {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
