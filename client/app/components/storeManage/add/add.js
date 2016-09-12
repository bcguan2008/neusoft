import addComponent from './add.component';
export default angular.module('storemadd', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMadd', {
  url: '/storeManage/add',
  template: '<storemadd></storemadd>'
});
})
.component('storemadd', addComponent);
