/**
 * components
 * @author guanbingchang@wanda.cn
 */

import store from './store/store';
import staff from './staff/staff';
import staffExcitation from './staffExcitation/staffExcitation';
import clerk from './clerk/clerk';
import template from './template/template'

export default angular.module('app.components', [
    store.name,
    staff.name,
    staffExcitation.name,
	clerk.name,
	template.name
]);