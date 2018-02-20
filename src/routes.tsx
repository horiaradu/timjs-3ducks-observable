import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import UseSetState from './containers/use-set-state';

const Routes = () => (
  <Switch>
    <Route path="/use-set-state" component={UseSetState} exact={true} />
  </Switch>
);

export default Routes;
