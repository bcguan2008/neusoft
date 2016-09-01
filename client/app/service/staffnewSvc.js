/**
 * Created by guanbingchang
 */

class staffnewSvc  {
  constructor(Api,$location,$http) {
    "ngInject";
    this.Api = Api;
    this.location = $location
    this.baseUrl = '/Employee/';
    this.$http = $http;
  }

  /**
   * 提交员工信息 保存新员工
   */
  createuser(params){
    console.log(params);
         return this.Api.post(this.baseUrl + 'addEmployee', params);
    }
 

//查询所有员工信息  ok
  getPageUserList(params){
    return this.Api.get(this.baseUrl+'stafflist', params);  
}


//获取员工个人详情
  getDetail(params){ //params 有数值，但是返回的data为空 状态=200
     // debugger;
   return this.Api.get(this.baseUrl + 'detail',params);
  }

//更新员工 
  updateEmployee(params){
    return this.Api.post(this.baseUrl + 'updateEmployee', params);
  }
  //更新员工状态
  changeStatus(params){
     return this.Api.post(this.baseUrl + 'changeStatus', params);
  }

//员工状态 
  stateStaff(params){
    this.location.path("/staff/state");
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
  //跳转到编辑页面信息
  updatestaff(){
    this.location.path("/staff/edit");
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