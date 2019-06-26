import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Profile from '../profile/Profile';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/profile/:id' component={Profile} />
    </Switch>
  );
};

export default Routes;
