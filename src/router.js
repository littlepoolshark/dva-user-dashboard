import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import NotFound from "./routes/NotFound.js";
import Counter from "./routes/Counter.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/notFound" component={NotFound} />
      <Route path="/counter" component={Counter} />
    </Router>
  );
}

export default RouterConfig;
