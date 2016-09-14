/**
 * Created by guanbingchang
 */

class storeSvc {
  constructor(Api, $q) {
    "ngInject";
    this.Api = Api;
    this.q = $q;
  }

  /*
  店铺明细 模拟
  */
  getDetail(id) {
    //return this.Api.post('/sop/门店明细',params) ;
    return {
      id: 1,
      name: "门店A",
      manager: "门店A管理员",
      managerTel: "13050000627",
      bak: "备注",
      template: [
        { name: "模版1", id: 1 },
        { name: "模版2", id: 2 },
      ]
    }
  }

  /**
   * 获取门店信息
   */
  getStoreInfoList(params) {
    //return this.Api.get('http://admin.sit.ffan.com/Staffmgt/Employee/storelist',params)
    return this.Api.get('/Organization/storelist', { id: 1 })
     //return this.Api.get('/Organization/storelist', { id: 1 })
  }

    getStoreAllList(params) {
    //return this.Api.get('http://admin.sit.ffan.com/Staffmgt/Employee/storelist',params)
    return this.Api.get('/Organization/storelist', params)

  }

  /**
   * 获取门店信息
   */
  getstorebyname(params) {
    return this.Api.get('/Organization/storelist/');
  }
  //导出门店信息
  exportExcellist(params) {
    return this.Api.get('/Organization/storelist?format=excel');
  }
}

export default storeSvc
