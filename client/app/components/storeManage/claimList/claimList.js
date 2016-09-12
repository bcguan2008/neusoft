import claimListComponent from './claimList.component';
export default angular.module('storeclaimlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeclaimlist', {
  url: '/storeManage/claimList',
  template: '<storeclaimlist></storeclaimlist>'
});
})
.component('storeclaimlist', claimListComponent);
