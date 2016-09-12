import editReviewListComponent from './editReviewList.component';
export default angular.module('storemeditreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMeditreviewlist', {
  url: '/storeManage/editReviewList',
  template: '<storemeditreviewlist></storemeditreviewlist>'
});
})
.component('storemeditreviewlist', editReviewListComponent);
