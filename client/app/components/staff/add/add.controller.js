export default class AddController {
  constructor($scope,$http,staffnewSvc) {
    "ngInject";
    //var vm = this;
   this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    $scope.ststoreNamemodel="";
  	$scope.ststoreName = [{ id: 1, name: '北京' }, { id: 2, name: '上海' }, { id: 3, name: '广州' }];
    // console.log(staffnewSvc);
 
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