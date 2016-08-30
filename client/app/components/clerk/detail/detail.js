import detailComponent from './detail.component';
export default angular.module('clerkdetail', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('clerkdetail', {
    url: '/clerk/detail',
    template: '<clerkdetail></clerkdetail>'
  });
})
.component('clerkdetail', detailComponent);
