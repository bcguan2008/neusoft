
import Api from './api.service.js';
import storeSvc from './storeSvc';

export default angular.module('app.services', [
])
.service({
    Api,
    storeSvc
})
.constant('APIBASE','/TODO');;
