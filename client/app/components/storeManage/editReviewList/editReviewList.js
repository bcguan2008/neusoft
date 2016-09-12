import editReviewListComponent from './editReviewList.component';
export default angular.module('storeeditreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeeditreviewlist', {
  url: '/storeManage/editReviewList',
  template: '<storeeditreviewlist></storeeditreviewlist>'
});
})
.component('storeeditreviewlist', editReviewListComponent);
