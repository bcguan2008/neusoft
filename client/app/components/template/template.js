/**
 * template
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';
let templateModule =  angular.module('app.template', [
    list.name,
    add.name
]);

export default templateModule;