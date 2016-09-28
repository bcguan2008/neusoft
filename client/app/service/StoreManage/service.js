
import Api from '../api.service.js';

import uploadSvc from '../uploadSvc';
import storeManageSvc from './storeManageSvc';

export default angular.module('app.storeManage.services', [
])
    .service({
        Api,
        uploadSvc,
        storeManageSvc
    })

