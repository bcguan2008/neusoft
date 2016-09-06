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
      this.scope = $scope;
      this.$state= $state;
      this.q = $q;
      this.d={};
      this.templateSvc=templateSvc;
      this.checkid='';
      this.gettemp={
      role_ids:'',
      role_info:''
    }
      this.init();
      this.getTempList();   
  }

  //返回
returnstafflistc(){
  	this.staffnewSvc.getstafflist();
  }
//updateEmployee
updatestaff(){
  var gettemp = this.gettemp
  this.d.role_ids =gettemp.role_ids;
  this.d.role_info = gettemp.role_info;
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
           // _this.d = result
             this.checkid = result.role_ids
               _this.d={
                  id:result.uuid,
                  name:result.name,
                  // function_role_name:result.role_info.function_role_name,
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
  //     //获取模板名称
  // getTemplateList(temlateName){
  //   let deferred = this.q.defer();
  //   let templateList = this.templateSvc.getPageTempbyname(temlateName).then((result)=>{
  //     return result.datas;
  //   });
  //   deferred.resolve(templateList); 
  //   return deferred.promise;
  // }

    //获取功能模板 check 多选
  getTempList(){
      this.templateSvc.getPageAllTempList().then((result)=>{
      this.scope.datas= result.datas; 
     // console.log(result.datas)
      
      var check_id = this.checkid.split(',')
          for(var i=0; i < result.datas.length; i++){
                for(var n=0; n < check_id.length; n++){
                 
                      if(result.datas[i].rid==check_id[n])
                      {
                        this.scope.datas[i].ifChecked = true;
                      }
                }
              
              }
      });
  }

  //判断checked 被选中
  updateSelection($event, id,name){
  var gettemp = this.gettemp
  var checkbox = $event.target;
  var action = (checkbox.checked?'add':'remove');
  //如果action 是add 则添加，要是remove 就是删除
  if (action=="add"){
    if( gettemp.role_ids==""){
      gettemp.role_ids=id; 
      gettemp.role_info=name; 
     }else{
         gettemp.role_ids=gettemp.role_ids+","+id;
         gettemp.role_info= gettemp.role_info+","+name;
     }
    }
    else{ 
       // 取消选中，则删除当前的id和template name
       var temp_name = gettemp.role_info.split(',')
        var words = gettemp.role_ids.split(',')
         for(var i=0;i<words.length;i++) 
         {
        
            if(words[i]==id)
            {
               words.splice(i,1);
               temp_name.splice(i,1);
            }
         }
         gettemp.role_ids= words.join(",")
         gettemp.role_info = temp_name.join(",")
    }

     console.log(gettemp.role_ids);
  }

}