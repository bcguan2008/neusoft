/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';
import 'jquery';
import 'bootstrap';

import angular from 'angular';
import './bp-sop-skin/theme.less';
import uiRouter from 'angular-ui-router';
import ffanTable from 'ffan-ng-table';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'angular-busy/dist/angular-busy';
import 'angular-busy/angular-busy.css';
import Service from './service/service';

import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/css/datetimepicker.css';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates';

import fancyui from 'fancyui';

angular.module('app', [
    uiRouter,
    Common.name,
    ffanTable.name,
    Components.name,
    Service.name,
    'cgBusy',
    'ui.bootstrap.datetimepicker',
    fancyui.name
  ])
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent);

  console.log('process.env.DEBUG', process.env.DEBUG);
