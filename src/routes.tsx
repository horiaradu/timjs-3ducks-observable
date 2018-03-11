import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Classic from './containers/classic';
import ErrorReceiver from './containers/error-receiver';
import Autocomplete from './containers/autocomplete';

const Routes = () => (
  <Switch>
    <Route path="/classic" component={Classic} exact={true} />
    <Route path="/errors" component={ErrorReceiver} exact={true} />
    <Route path="/autocomplete" component={Autocomplete} exact={true} />
  </Switch>
);

export default Routes;
