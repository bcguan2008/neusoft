/**
 * store
 * @author guanbingchang@wanda.cn
 */
import angular from 'angular';
import list from './list/list';
import add from './add/add';
import detail from './detail/detail';
import edit from './edit/edit';
import myRole from './myRole/myRole';

let staffModule =  angular.module('app.staff', [
    list.name,
    add.name,
    detail.name,
    edit.name,
    myRole.name
]);
export default staffModule;
