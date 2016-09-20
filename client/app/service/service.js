
import Api from './api.service.js';
import storeSvc from './storeSvc';
import staffnewSvc from './staffnewSvc';
import staffExcitationSvc from './staffExcitationSvc';
import clerkSvc from './clerkSvc';
import templateSvc from './templateSvc';
import treeSvc from './treeSvc';
import uploadSvc from './uploadSvc';

export default angular.module('app.services', [
])
.service({
    Api,
    storeSvc,
    staffnewSvc,
    staffExcitationSvc,
    clerkSvc,
    templateSvc,
    treeSvc,
    uploadSvc
})
.constant('APIBASE','/Staffmgt');;
