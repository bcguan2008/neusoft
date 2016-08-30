/**
 * Created by guanbingchang
 */

class staffExcitationSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
    this.baseUrl = '/staffExcitation/list/';
    this.personUrl = '/staffExcitation/personlist/';
  }

 getExcitationPerList(params){
    return this.Api.post(this.personUrl + 'getExcitationPerList', params);
  }

  getExcitationList(params){
    return this.Api.post(this.baseUrl + 'getExcitationList', params);
  }


  
}
  
export default staffExcitationSvc