import listComponent from './list.component';
export default angular.module('storemlist', [])
  .config(($stateProvider) => {
    "ngInject";
  $stateProvider.state('storeMlist', {
    url: '/storeManage/list',
    template: '<storemlist></storemlist>'
  });
})
.component('storemlist', listComponent);
