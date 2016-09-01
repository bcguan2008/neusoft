import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editComponent from './edit.component';
export default angular.module('templateedit', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('templateedit', {
  url: '/template/edit/{id}',
  template: '<templateedit></templateedit>'
});
})
.component('templateedit', editComponent);
