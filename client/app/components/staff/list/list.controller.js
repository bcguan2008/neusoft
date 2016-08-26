/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor(staffnewSvc) {
  	 "ngInject";
  	this.staffnewSvc = staffnewSvc;
    this.name = 'list';
    console.log(staffnewSvc);
  }
  search(){
  	this.staffnewSvc.getStaffInfoList();
  }
}