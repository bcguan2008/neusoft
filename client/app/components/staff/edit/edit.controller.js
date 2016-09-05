/**
 * (description)
 * 
 * @author yourname
 */
export default class EditController {
    constructor($scope,Api,$state,staffnewSvc) {
      "ngInject";
    
      this.name = 'edit';
      this.Api = Api;
      this.staffnewSvc= staffnewSvc;
      this.$scope = $scope;
      this.$state= $state;
      this.d={};
      this.init()
   
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

	this.staffnewSvc.updateEmployee(this.d);

}

    /**
   * [init 初始化]
   */

  init(){
      let self = this;
      var _this = this;
       self.loading = true;
     self.loadPromise =  self.staffnewSvc.getDetail({
      id: this.$state.params.id,
      type:1
    });
       return self.loadPromise.then(result => {
          self.loading = false;
          if(result){
              _this.d={
                  id:result.uuid,
                  name:result.name,
                  contact:result.contact,
                  rtx:result.rtx,
                  storeName:result.organization_name,
                  email:result.email
              }

          }
        });
  }

}