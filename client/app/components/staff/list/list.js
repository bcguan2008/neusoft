import listComponent from './list.component';
export default angular.module('stafflist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('stafflist', {
  url: '/staff/list/:id',
  template: '<stafflist></stafflist>'
});
})
.component('stafflist', listComponent);
