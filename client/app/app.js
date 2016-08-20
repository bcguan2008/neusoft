/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';
import './bp-sop-skin/theme.less';
import uiRouter from 'angular-ui-router';
import ffanTable from 'ffan-ng-table';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'bootstrap';
import 'angular-busy/dist/angular-busy';
import 'angular-busy/angular-busy.css';


angular.module('app', [
    uiRouter,
    Common.name,
    ffanTable.name,
    Components.name,
    'cgBusy'
  ])
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent);

  console.log('process.env.DEBUG', process.env.DEBUG);
