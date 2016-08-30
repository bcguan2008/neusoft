/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
  constructor($state,staffnewSvc,) {
  	 "ngInject";
  	this.staffnewSvc=staffnewSvc;
  	this.name = 'detail';
  	this.$state = $state;
  }
  init(){
      debugger;
  }
//返回
  getstafflistc(){

  	this.staffnewSvc.getstafflist();

  }

}