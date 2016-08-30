/**
 * Created by guanbingchang
 */

class clerkSvc  {
  constructor(Api) {
    "ngInject";
    this.Api = Api;
     this.baseUrl = '/clerk/clerk/';
  }
//获取个人权限
  getPersonright(params){
    // return this.Api.post(this.baseUrl + 'getPageUserList', params);
     return this.Api.post(this.baseUrl + 'getPersonright', params);
  }
}

export default clerkSvc
