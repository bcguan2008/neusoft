import listComponent from './list.component';
export default angular.module('storelist', [])
  .config(($stateProvider) => {
    "ngInject";
  $stateProvider.state('storelist', {
    url: '/storeManage/list',
    template: '<storelist></storelist>'
  });
})
.component('storelist', listComponent);
