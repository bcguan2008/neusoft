import claimReviewListComponent from './claimReviewList.component';
export default angular.module('storemclaimreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMclaimreviewlist', {
  url: '/storeManage/claimReviewList',
  template: '<storemclaimreviewlist></storemclaimreviewlist>'
});
})
.component('storemclaimreviewlist', claimReviewListComponent);
