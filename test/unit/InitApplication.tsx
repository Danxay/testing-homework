import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApplicationState } from '../../src/client/store';
import { Application } from '../../src/client/Application';

export function InitApplication(Component = Application, initState: ApplicationState = {
  cart: {},
  details: {},
}): JSX.Element {
  const basename = '/';
  const store = createStore(() => initState)

  return (
    <BrowserRouter basename={basename}>
      <Provider store={store}>
        <Component />
      </Provider>
    </BrowserRouter>
  );
}
