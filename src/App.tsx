import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorDetail from './container/ErrorDetail';
import Front from "./pages/Front";

function App() {
  return (
    <Router>
      <Layout>
        <ErrorDetail>
          <Switch>
            {/* <Route path="/auth" component={Auth} /> */}
            <Route path="/" component={Front} />
          </Switch>
        </ErrorDetail>
      </Layout>
    </Router>
  );
}

export default App;
