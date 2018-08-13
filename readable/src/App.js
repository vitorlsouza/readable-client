import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import appRoutes from './routes/app';

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel">
              <Header {...this.props}/>
              <Switch>
                {
                  appRoutes.map((prop,key) => {
                    if(prop.redirect)
                        return (
                          <Redirect from={prop.path} to={prop.to} key={key}/>
                        );
                        if(prop.path === '/:category') {
                          return (
                            <Route exact path={prop.path} component={prop.component} key={key}/>
                          );
                        }
                          return (
                            <Route path={prop.path} component={prop.component} key={key}/>
                          );
                  })
                }
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
