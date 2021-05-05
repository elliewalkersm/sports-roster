import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import AddPlayer from '../views/AddPlayer';
import Roster from '../views/Roster';
import NotFound from '../views/NotFound';

const Routes = () => (
    <div>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/AddPlayer' component={AddPlayer} />
      <Route exact path='/Roster' component={Roster} />
      <Route exact path='*' component={NotFound} />
      </Switch>
    </div>
);

export default Routes;
