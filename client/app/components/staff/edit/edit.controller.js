/**
 * (description)
 * 
 * @author yourname
 */
export default class EditController {
    constructor(Api,$state,staffnewSvc) {
      "ngInject";
    
      this.name = 'edit';
      this.Api = Api;
      this.staffnewSvc= staffnewSvc;
this.$scope = $scope;
       var vm = this;
    
      this.init($scope)
   
  }
  //   init(){
  //   //    $scope.vm.store = this.api.get
  // }
  //返回
returnstafflistc(){

  	this.staffnewSvc.getstafflist();

  }
//updateEmployee
updatestaff(){

	this.staffnewSvc.updateEmployee();

}

    /**
   * [init 初始化]
   */

  init($scope){
     let self = this;
     
     //console.log(this.$state.params.id)
       return self.staffnewSvc.getDetail({
      id: this.$state.params.id
    })
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