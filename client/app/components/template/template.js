/**
 * template df
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';
export default angular.module('app.template', [
    list.name,
    add.name
]);

