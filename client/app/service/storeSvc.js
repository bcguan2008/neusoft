/**
 * Created by guanbingchang
 */

class storeSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
  }

  /**
   * 获取门店信息
   */
  getStoreInfoList(params){
    return this.Api.post('/sop/storeInfoList',params) 
  }
}

export default storeSvc
