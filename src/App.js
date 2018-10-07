import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Flex, Text } from 'rebass';

import history from './history';
// import TodoList from './views/TodoList'

const TodoList = Loadable({
  loader: () => import('./views/TodoList'),
  loading: () => <Text>App loading</Text>,
});

class App extends Component {
  render() {
    return (
      <Flex p={12} alignItems="center">
        <Switch>
          <Route path="/" name="Todo List" component={TodoList} />
        </Switch>
      </Flex>
    );
  }
}

const RoutedApp = () => (
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
);

export default RoutedApp;
