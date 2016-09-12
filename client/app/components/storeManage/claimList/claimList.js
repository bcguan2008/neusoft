import claimListComponent from './claimList.component';
export default angular.module('storemclaimlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMclaimlist', {
  url: '/storeManage/claimList',
  template: '<storemclaimlist></storemclaimlist>'
});
})
.component('storemclaimlist', claimListComponent);
