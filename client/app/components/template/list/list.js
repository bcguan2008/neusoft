import listComponent from './list.component';
export default angular.module('templatelist', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('list', {
    url: '/template/list',
    template: '<templatelist></templatelist>'
  });
})
.component('templatelist', listComponent);
