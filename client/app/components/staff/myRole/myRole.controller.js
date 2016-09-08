/**
 * (description)
 * 
 * @author yourname
 */

export default class MyRoleController {
  constructor(staffnewSvc) {
    "ngInject";
    this.staffSvc = staffnewSvc;
    this.staffInfo = {};
  }

  $onInit(){
    this.loadPromise = this.staffSvc.getMyRole();
    this.loadPromise.then(result=>{
      this.staffInfo = result
    })
  }

  getRoles(roles){
    let result = []; 
    if(roles){
      roles.forEach(o=>{
        result.push(o.name);
      })
    }
    if(result.length===0){
      return '';
    }
    return result.join(',');
  }
}