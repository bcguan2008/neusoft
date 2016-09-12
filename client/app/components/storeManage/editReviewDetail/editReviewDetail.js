import editReviewDetailComponent from './editReviewDetail.component';
export default angular.module('editReviewDetail', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('editReviewDetail', {
  url: '/editReviewDetail',
  template: '<editReviewDetail></editReviewDetail>'
});
})
.component('editReviewDetail', editReviewDetailComponent);
