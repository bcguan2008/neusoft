import detailComponent from './detail.component.js';
export default angular.module('storedetail', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('storedetail', {
  url: '/store/detail/{id}',
  template: '<storedetail></storedetail>'
});
})
.component('storedetail', detailComponent);
