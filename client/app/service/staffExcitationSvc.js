/**
 * Created by guanbingchang
 */

class staffExcitationSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
    this.baseUrl = '/staffExcitation/staffExcitation/';
  }

 getExcitationPerList(params){
    return this.Api.post(this.baseUrl + 'getExcitationPerList', params);
  }

  getExcitationList(params){
    return this.Api.post(this.baseUrl + 'getExcitationList', params);
  }


  
}
  
export default staffExcitationSvc