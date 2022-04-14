import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Tasks, Posts } from './pages';
import { MainLayout } from './layouts/MainLayout';

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route path="/" exact component={Tasks} />
        <Route path="/posts" exact component={Posts} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default App;