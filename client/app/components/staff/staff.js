import staffComponent from './staff.component';
export default angular.module('staff', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('staff', {
  url: '/staff',
  template: '<staff></staff>'
});
})
.component('staff', staffComponent);
