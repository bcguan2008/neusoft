import detailComponent from './detail.component';
export default angular.module('detail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('detail', {
  url: '/detail',
  template: '<detail></detail>'
});
})
.component('detail', detailComponent);
