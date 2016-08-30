import detailComponent from './detail.component';
export default angular.module('staffdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('staffdetail', {
  url: '/staff/detail',
  template: '<staffdetail></staffdetail>'
});
})
.component('staffdetail', detailComponent);
