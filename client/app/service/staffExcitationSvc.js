/**
 * Created by guanbingchang
 */
import Api from './api.service';

class staffExcitationSvc  {
  constructor($http,$q) {
    "ngInject";
    this.Api = new Api($http,$q,'/Xapi');
    this.baseUrl = '/encourage/';
  }
//根据商户号获取旗下员工维度的付款激励汇总
 getBestirByMonth(params){
  //console.log(params)
  return this.Api.get(this.baseUrl+'month_total', params); 
  }

//根据商户号搜索某商户下员工的付款码激励明细
  getBestirList(params){ 
    return this.Api.get(this.baseUrl+'list', params); 
  }

  //个人激励列表
  getBestirPerList(params){ 
   return this.Api.get(this.baseUrl+'encourage_my_list', params); 
  }
}
  
export default staffExcitationSvc