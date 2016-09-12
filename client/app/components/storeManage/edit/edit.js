import editComponent from './edit.component.js';
export default angular.module('storemedit', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeMedit', {
  url: '/storeManage/edit/{id}',
  template: '<storemedit></storemedit>'
});
})
.component('storemedit', editComponent);
