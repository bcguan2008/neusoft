/**
 * Created by guanbingchang
 */

class storeSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
  }
  
    /*
    店铺明细
    */
    getDetial(id){
        //return this.Api.post('/sop/门店明细',params) ;
        return {
            
            id:1,
            name:"门店A",
            manager:"门店A管理员",
            managerTel:"13050000627",
            bak:"备注",
            template:[
                {name:"模版1",id:1},
                {name:"模版2",id:2},
            ]
        }
    }

  /**
   * 获取门店信息
   */
  getStoreInfoList(params){
    //return this.Api.post('/sop/storeInfoList',params) ;

    return {
      storeID:1,
      storeName:2
    }
  }
}

export default storeSvc
