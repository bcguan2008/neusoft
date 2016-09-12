import addComponent from './add.component';
export default angular.module('storeadd', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeadd', {
  url: '/storeManage/add',
  template: '<storeadd></storeadd>'
});
})
.component('storeadd', addComponent);
