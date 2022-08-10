import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/main';
import Footer from '../components/Footer';

const routes = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </Fragment>
);

export default routes;
