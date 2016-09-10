/**
 * Created by guanbingchang
 */

class commonSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
  }

  /**
   * 获取门店信息
   */
  getStoreInfoList() {
    return this.Api.get('/Organization/storelist');
  }
}
  
export default commonSvc