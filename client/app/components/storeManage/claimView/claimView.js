import claimViewComponent from './claimView.component';
export default angular.module('storemview', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMview', {
  url: '/storeManage/claimview/{id}',
  template: '<storemview></storemview>'
});
})
.component('storemview', claimViewComponent);

