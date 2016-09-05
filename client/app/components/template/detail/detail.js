import detailComponent from './detail.component.js';
export default angular.module('templatedetail', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('templatedetail', {
  url: '/template/detail/:id',
  template: '<templatedetail></detail>'
});
})
.component('templatedetail', detailComponent);
