/**
 * (description)
 * 
 * @author yourname
 */
export default class EditController {
    constructor($scope,Api,$state,staffnewSvc,templateSvc,$q) {
      "ngInject";
    
      this.name = 'edit';
      this.Api = Api;
      this.staffnewSvc= staffnewSvc;
      this.$scope = $scope;
      this.$state= $state;
      this.q = $q;
      this.d={};
      this.templateSvc=templateSvc;
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
          console.log(result);
          if(result){
              _this.d={
                  id:result.uuid,
                  name:result.name,
                  templateName:result.template_data.template_name,
                  contact:result.contact,
                  rtx:result.rtx,
                  storeName:result.storeName,
                  email:result.email,
                  employee_id:result.employee_id,
                  employee_organization_name:result.employee_organization_name
              }

          }
        });
  }
      //获取模板名称
  getTemplateList(temlateName){
    let deferred = this.q.defer();
    let templateList = this.templateSvc.getPageTempbyname(temlateName).then((result)=>{
      return result.datas;
    });
    deferred.resolve(templateList); 
    return deferred.promise;
  }

}