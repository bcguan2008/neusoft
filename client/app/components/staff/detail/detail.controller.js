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
    this.$scope = $scope;
    var vm = this;
    
    this.init($scope)
   
      // $scope.contact="asd"; 
  }

//返回
  returnstafflistc(){
  	this.staffnewSvc.getstafflist();
  }


  	/**
   * [init 初始化]
   */

  init($scope){
  	 let self = this;
  	 
  	 //console.log(this.$state.params.id)
  	   return self.staffnewSvc.getDetail("250686")
        .then(result => {

          if(result){
          	console.log(result)
          	var vm = this;
          //  params.total(result.total);
           $scope.name=result.name; 
           $scope.contact=result.contact; 
           $scope.rtx=result.rtx;
           $scope.storeName=result.organization_name;
           $scope.email=result.email;

          }
        });
  }


}