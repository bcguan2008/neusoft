import detailComponent from './detail.component.js';
export default angular.module('storemdetail', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('storeMdetail', {
  url: '/storeManage/detail/{id}',
  template: '<storemdetail></storemdetail>'
});
})
.component('storemdetail', detailComponent);
