import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editComponent from './edit.component';
let editModule =  angular.module('staffedit', [uiRouter])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('staffedit', {
  url: '/staff/edit',
  template: '<staffedit></staffedit>'
});
})
.component('staffedit', editComponent);
export default editModule;
