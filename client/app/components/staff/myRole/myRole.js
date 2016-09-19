import myRoleComponent from './myRole.component';
export default angular.module('myrole', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('myrole', {
    url: '/myrole',
    template: '<myrole></myrole>'
  });
})
.component('myrole', myRoleComponent);
