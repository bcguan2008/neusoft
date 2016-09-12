import claimReviewDetailComponent from './claimReviewDetail.component';
export default angular.module('storemclaimreviewdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMclaimreviewdetail', {
  url: '/storeManage/claimReviewDetail/{id}',
  template: '<storemclaimreviewdetail></storemclaimreviewdetail>'
});
})
.component('storemclaimreviewdetail', claimReviewDetailComponent);
