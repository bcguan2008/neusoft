import listComponent from './list.component';
export default angular.module('list', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('staffElist', {
  url: '/staffExcitation/list',
  template: '<list></list>'
});
}) 
.component('list', listComponent);