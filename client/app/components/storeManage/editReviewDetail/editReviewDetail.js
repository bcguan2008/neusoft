import editReviewDetailComponent from './editReviewDetail.component';
export default angular.module('storemeditreviewdetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMeditreviewdetail', {
  url: '/storeManage/editReviewDetail/{id}',
  template: '<storemeditreviewdetail></storemeditreviewdetail>'
});
})
.component('storemeditreviewdetail', editReviewDetailComponent);
