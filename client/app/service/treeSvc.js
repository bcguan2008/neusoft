/**
 * Created by guanbingchang
 */

class treeSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
  }
//保存模板
  get(params){
  	 return this.Api.post(this.baseUrl + 'save', params);
  }

}

export default templateSvc
