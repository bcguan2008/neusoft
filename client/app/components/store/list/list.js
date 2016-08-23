import listComponent from './list.component';
export default angular.module('storelist', [])
  .config(($stateProvider) => {
    "ngInject";
  $stateProvider.state('storelist', {
    url: '/store/list',
    template: '<storelist></storelist>'
  });
})
.component('storelist', listComponent);
