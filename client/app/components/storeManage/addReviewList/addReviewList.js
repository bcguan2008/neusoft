import addReviewListComponent from './addReviewList.component';
export default angular.module('storeaddreviewlist', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeaddreviewlist', {
  url: '/storeManage/addReviewList',
  template: '<storeaddreviewlist></storeaddreviewlist>'
});
})
.component('storeaddreviewlist', addReviewListComponent);
