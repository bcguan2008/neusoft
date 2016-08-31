/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';
import 'jquery';
import 'bootstrap';
import 'bp-sop-skin';
import angular from 'angular';
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


angular.module('app', [
    uiRouter,
    Common.name,
    ffanTable.name,
    Components.name,
    Service.name,
    'cgBusy',
    'ui.bootstrap.datetimepicker'
  ])
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent);

  console.log('process.env.DEBUG', process.env.DEBUG);
