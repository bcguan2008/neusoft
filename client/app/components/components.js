/**
 * components
 * @author guanbingchang@wanda.cn
 */

import store from './store/store';
import storeManage from './storeManage/storeManage';
import staff from './staff/staff';
import staffExcitation from './staffExcitation/staffExcitation';
import clerk from './clerk/clerk';
import template from './template/template'

import './components.less';

export default angular.module('app.components', [
    store.name,
    storeManage.name,
    staff.name,
    staffExcitation.name,
	clerk.name,
	template.name
]);