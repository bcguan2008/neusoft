import listComponent from './list.component.js';
export default angular.module('templatelist', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('templatelist', {
    url: '/template/list',
    template: '<templatelist></templatelist>'
  });
})
.component('templatelist', listComponent);
