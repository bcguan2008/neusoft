import storeComponent from './store.component';
export default angular.module('store', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('store', {
  url: '/store',
  template: '<store></store>'
});
})
.component('store', storeComponent);
