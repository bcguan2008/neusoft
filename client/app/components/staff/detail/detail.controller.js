/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
  constructor($scope,staffnewSvc) {
  	 "ngInject";
  	this.staffnewSvc=staffnewSvc;
    this.name = 'detail';
  }

//返回
getstafflistc(){

  	this.staffnewSvc.getstafflist();

  }

}