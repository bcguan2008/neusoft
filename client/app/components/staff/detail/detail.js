import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailComponent from './detail.component';
export default angular.module('staffdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('staffdetail', {
  url: '/staff/detail/:id',
  template: '<staffdetail></staffdetail>'
});
})
.component('staffdetail', detailComponent);