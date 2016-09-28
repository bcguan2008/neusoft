/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';
import 'jquery';
import 'bootstrap';
import 'bp-sop-skin';
import angular from 'angular';
import 'angular-ui-tree';
import uibs from 'angular-ui-bootstrap';
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


import ngFileUpload from 'ng-file-upload';

angular.module('app', [
    uiRouter,
    Common.name,
    ffanTable.name,
    Components.name,
    Service.name,
    ngFileUpload,
    'cgBusy',
    'ui.bootstrap.datetimepicker',
    uibs
  ])
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent)
  .directive('typeahead', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            element.bind('click', function () {
                element[0].value =' '; 
                ctrl.$setViewValue(element[0].value);
            });
        }
    };
  })
  .filter('html',function($sce){
        "ngInject";
        return function(text){
            if(text){
            return $sce.trustAsHtml(text);
            }
            return '';
        }
    })


  console.log('process.env.DEBUG', process.env.DEBUG);
