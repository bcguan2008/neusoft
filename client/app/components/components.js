/**
 * components
 * @author guanbingchang@wanda.cn
 */

import store from './store/store';
import staff from './staff/staff';
import template from './template/template';

export default angular.module('app.components', [
    store.name,
    staff.name,
    template.name
]);

