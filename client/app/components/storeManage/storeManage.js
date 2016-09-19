/**
 * storeManage
 * @author luoqian14
 */

import list from './list/list';
import add from './add/add';
import detail from './detail/detail';
import edit from './edit/edit';
import claimList from './claimList/claimList';
import claimDetail from './claimDetail/claimDetail';

export default angular.module('app.storeManage', [
    list.name,
    add.name,
    detail.name,
    edit.name,
    claimList.name,
    claimDetail.name
]);