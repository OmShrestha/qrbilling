import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../component/NotFound';
import Home from '../component/Home';
import Homepage from '../pages/Homepage/Homepage';
import Billing from '../pages/Billing/Billing';
import Success from '../component/SuccessMessage/Success';

const AppRouter = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/success" exact component={Success} />
    <Route path="/:id" exact component={Homepage} />
    <Route path="/:id/billing" exact component={Billing} />
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
