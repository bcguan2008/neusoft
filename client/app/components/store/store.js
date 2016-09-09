/**
 * store
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';
import detail from './detail/detail';
import edit from './edit/edit';
import claimList from './claimList/claimList';

export default angular.module('app.store', [
    list.name,
    add.name,
    detail.name,
    edit.name,
    claimList.name
]);

