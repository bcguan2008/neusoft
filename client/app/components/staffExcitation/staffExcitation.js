/**
 * staffExcitation
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import personlist from './personlist/list';

 
export default angular.module('app.staffExcitation', [
    list.name,
    personlist.name
]);

