import claimEditComponent from './claimEdit.component';
export default angular.module('storemclaimedit', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMclaimedit', {
  url: '/storeManage/claimedit/{id}',
  template: '<storemclaimedit></storemclaimedit>'
});
})
.component('storemclaimedit', claimEditComponent);
