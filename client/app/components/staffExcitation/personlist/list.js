import listComponent from './list.component';
export default angular.module('personlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('personlist', {
  url: '/staffExcitation/personlist',
  template: '<personlist></personlist>'
}); 
})
.component('personlist', listComponent);