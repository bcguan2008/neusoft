import claimReviewDetailComponent from './claimReviewDetail.component';
export default angular.module('storeclaimreviewdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeclaimreviewdetail', {
  url: '/storeManage/claimReviewDetail/{id}',
  template: '<storeclaimreviewdetail></storeclaimreviewdetail>'
});
})
.component('storeclaimreviewdetail', claimReviewDetailComponent);
