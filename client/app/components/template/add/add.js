import addComponent from './add.component';
export default angular.module('templateadd', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('templateadd', {
    url: '/template/add',
    template: '<templateadd></templateadd>'
  });
})
.component('templateadd', addComponent);