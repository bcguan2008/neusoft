/**
 * store
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';
import detail from './detail/detail';
import edit from './edit/edit';
import claimList from './claimList/claimList';
import addReviewList from './addReviewList/addReviewList';
import claimReviewList from './claimReviewList/claimReviewList';
import claimReviewDetail from './claimReviewDetail/claimReviewDetail';
import editReviewList from './editReviewList/editReviewList';
import editReviewDetail from './editReviewDetail/editReviewDetail';

export default angular.module('app.store', [
    list.name,
    add.name,
    detail.name,
    edit.name,
    claimList.name,
    addReviewList.name,
    claimReviewList.name,
    claimReviewDetail.name,
    editReviewList.name,
    editReviewDetail.name
]);

