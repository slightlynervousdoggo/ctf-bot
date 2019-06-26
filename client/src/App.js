import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <div className='App'>
          <header className='App-header'>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </header>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
