import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/custom-animation.css';

import store from './store/store';

ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
  <BrowserRouter>
    <Route
      path="/"
      name="Home"
      component={App}
    />
  </BrowserRouter>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'));
  registerServiceWorker();
