import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';

ReactDOM.render(
  <Router basename={`${process.env.PUBLIC_URL}`}>
    <App />
  </Router>,
  document.getElementById('root'),
);
