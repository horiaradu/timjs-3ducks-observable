import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Classic from './containers/classic';
import ErrorReceiver from './containers/error-receiver';
import Autocomplete from './containers/autocomplete';
import PingPong from './containers/ping-pong';

const Routes = () => (
  <Switch>
    <Route path="/classic" component={Classic} exact={true} />
    <Route path="/errors" component={ErrorReceiver} exact={true} />
    <Route path="/autocomplete" component={Autocomplete} exact={true} />
    <Route path="/sockets" component={PingPong} exact={true} />
  </Switch>
);

export default Routes;
