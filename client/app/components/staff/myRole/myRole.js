import myRoleComponent from './myRole.component';
export default angular.module('myrole', [])
  .config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('myrole', {
    url: '/staff/myrole',
    template: '<myrole></myrole>'
  });
})
.component('myrole', myRoleComponent);
