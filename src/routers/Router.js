import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../component/NotFound';
import Home from '../component/Home';
import ItemDetail from '../component/ItemDetail';
import Navbar from '../component/Navbar';
import Billing from '../component/Billing';
import Success from '../component/Success';

const AppRouter = () => (
  <Navbar>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/success" exact component={Success} />
      <Route path="/:id" exact component={ItemDetail} />
      <Route path="/:id/billing" exact component={Billing} />
      <Route component={NotFound} />
    </Switch>
  </Navbar>
);

export default AppRouter;
