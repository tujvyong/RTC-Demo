import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorDetail from './container/ErrorDetail';
import RTCsettings from './container/RTCsettings';
import Front from "./pages/Front";

function App() {
  return (
    <Router>
      <Layout>
        <ErrorDetail>
          <Switch>
            <Route path="/:roomName" component={RTCsettings} />
            <Route path="/" component={Front} />
          </Switch>
        </ErrorDetail>
      </Layout>
    </Router>
  );
}

export default App;
