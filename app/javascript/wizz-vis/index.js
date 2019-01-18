/* jshint esversion: 6 */

// Imports for IE11
import 'es6-promise';
import 'isomorphic-fetch';
import '@babel/polyfill';

import ReactOnRails from 'react-on-rails';

import DashboardApp from './startup/DashboardApp';
import ControlsApp from './startup/ControlsApp';
import FiltersApp from './startup/FiltersApp';
import WidgetBase from './components/WidgetBase';
import Clock from './components/Clock';

import ReduxStore from './store/index';

ReactOnRails.register({
  DashboardApp,
  WidgetBase,
  Clock,
  ControlsApp,
  FiltersApp
});

ReactOnRails.registerStore({
  ReduxStore,
});
