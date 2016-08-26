import addComponent from './add.component';


export default angular.module('staffadd', [])
.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('staffadd', {
			url: '/staff/add',
  			template: '<staffadd></staffadd>'
		});
})
  
.component('staffadd', addComponent); 