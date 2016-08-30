/**
 * Created by guanbingchang
 */

class staffnewSvc  {
  constructor(Api,$location) {
    "ngInject";
    this.Api = Api;
    this.location = $location
    this.baseUrl = '/staff/list/';
  }

  /**
   * 提交员工信息 保存新员工
   */
  createuser(params){
         return this.Api.post(this.baseUrl + 'save', params);
    }
  

//获取所有员工信息
  getPageUserList(params){
    // return this.Api.post(this.baseUrl + 'getPageUserList', params);
     return this.Api.post("http://api.sit.ffan.com/Staffmgt/Employee/storelist", params);
  }

//获取员工详情
  getDetail(params){
    return this.Api.post(this.baseUrl + 'getDetail', params);
  }
//员工状态 
  stateStaff(){

  }
  //搜索员工
  getStaffbysearch(){

  }
//返回到新建员工
  getstaffpage(){ //ok
     this.location.path("/staff/add");
  }
//返回到员工list
  getstafflist(){ //ok
     this.location.path("/staff/list");
  }

}
  
  // handleSuccess:function(res){
  //   console.log(res.data)
  //    return res.data;
  // }


  //   handleError:function(error){
  //      return function () {
  //               return { success: false, message: error };
  //           };
  // }


export default staffnewSvc