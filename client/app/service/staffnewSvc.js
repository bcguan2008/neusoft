/**
 * Created by guanbingchang
 */

class staffnewSvc  {
  constructor(Api,$http) {
    "ngInject";
    this.Api = Api;

  }
 
  /**
   * 提交员工信息
   */
  createuser(user){
    console.log("aaa" & user) ;
      return this.Api.post('http://api.sit.ffan.com/Staffmgt/Employee/addEmployee', user).then(handleSuccess, handleError('Error'));
  }

  getStaffInfoList()
    {
           return this.Api.get('http://api.sit.ffan.com/Staffmgt/Employee/detail').then(handleSuccess, handleError('Error'));
 
    }

  updateStaff(){

         return this.Api.get('http://api.sit.ffan.com/Staffmgt/Employee/updateEmployee', user).then(handleSuccess, handleError('Error'));
 
  } 
  stateStaff(){

        return this.Api.get('http://api.sit.ffan.com/Staffmgt/Employee/changeStatus', user).then(handleSuccess, handleError('Error'));
 
  }
  
  getStaffbysearch(){

         return this.Api.get('api.sit.ffan.com/Staffmgt/Employee/list', user).then(handleSuccess, handleError('Error'));
 
  }




}

export default staffnewSvc