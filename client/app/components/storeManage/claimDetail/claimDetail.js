import claimDetailComponent from './claimDetail.component';
export default angular.module('storemclaimdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMclaimdetail', {
  url: '/storeManage/claimDetail/{id}',
  template: '<storemclaimdetail></storemclaimdetail>'
});
})
.component('storemclaimdetail', claimDetailComponent);
