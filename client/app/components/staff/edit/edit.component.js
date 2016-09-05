import template from './edit.html';
import controller from './edit.controller';
import './edit.less';

let editComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};
export default editComponent;
