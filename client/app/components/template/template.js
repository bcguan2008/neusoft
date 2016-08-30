/**
 * template
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';
import detail from './detail/detail';
import edit from './edit/edit';

let templateModule =  angular.module('app.template', [
   	list.name,
    add.name,
    detail.name,
    edit.name
]);

export default templateModule;