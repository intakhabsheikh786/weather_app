import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from '../src/components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
