/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {

  constructor($scope,$http,staffnewSvc) {
    "ngInject";
   // this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    
  } 

	
 	/**
	   * [create 提交]
	   */
	createuser(){
	 	    var vm = this;
	 	    console.log(vm.user)
	 		this.staffnewSvc.createuser(vm.user).then(function(response){
	 		if (response.success) {
	 				console.log("create success")
                       
                    } else {
                    	console.log("create fail")
                    }
	 	});
	  }

  //  /**
  //  * [cancel 取消]
  //  */
	 //  cancel(){
	    
	 //  }
}