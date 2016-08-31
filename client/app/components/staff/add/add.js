import addComponent from './add.component';
import uiRouter from 'angular-ui-router';
let addModule = angular.module('staffadd', [uiRouter])
.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('staffadd', {
			url: '/staff/add',
  			template: '<staffadd></staffadd>'
		});
})
  
.component('staffadd', addComponent); 
export default addModule;
