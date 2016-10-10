import addComponent from './add.component';
import uiRouter from 'angular-ui-router';
let addModule = angular.module('staffadd', [uiRouter])
.component('staffadd', addComponent); 
export default addModule;
