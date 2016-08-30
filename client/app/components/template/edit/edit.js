import editComponent from './edit.component';
export default angular.module('templateedit', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('templateedit', {
  url: '/template/edit',
  template: '<edit></edit>'
});
})
.component('edit', editComponent);
