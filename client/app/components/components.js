/**
 * components
 * @author guanbingchang@wanda.cn
 */

import store from './store/store';
import staff from './staff/staff';

export default angular.module('app.components', [
    store.name,
    staff.name
]);

