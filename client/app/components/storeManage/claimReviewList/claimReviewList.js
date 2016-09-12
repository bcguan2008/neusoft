import claimReviewListComponent from './claimReviewList.component';
export default angular.module('storeclaimreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeclaimreviewlist', {
  url: '/storeManage/claimReviewList',
  template: '<storeclaimreviewlist></storeclaimreviewlist>'
});
})
.component('storeclaimreviewlist', claimReviewListComponent);
