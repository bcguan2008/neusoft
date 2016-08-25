import addComponent from './add.component';
export default angular.module('add', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('add', {
  url: '/add',
  template: '<add></add>'
});
})
.component('add', addComponent);
