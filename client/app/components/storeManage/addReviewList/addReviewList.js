import addReviewListComponent from './addReviewList.component';
export default angular.module('storemaddreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMaddreviewlist', {
  url: '/storeManage/addReviewList',
  template: '<storemaddreviewlist></storemaddreviewlist>'
});
})
.component('storemaddreviewlist', addReviewListComponent);
