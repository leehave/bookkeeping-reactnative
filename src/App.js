import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Global from '~/utils/Global';
import store from './redux/store/Store';
// import AuthLoading from '~/route/AuthLoading';
import {AppNavigator} from './navigators/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
