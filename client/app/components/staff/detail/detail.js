import detailComponent from './detail.component.js';
export default angular.module('detail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('detail', {
  url: '/staff/detail',
  template: '<detail></detail>'
});
})
.component('detail', detailComponent);
