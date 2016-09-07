/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
  constructor($scope,staffnewSvc,$state,Api) {
  	 "ngInject";
  	this.staffnewSvc=staffnewSvc;
    this.name = 'detail';
    this.$state = $state;
    this.api = Api;
    this.detailInit();
    this.d={};
    //this.getTempList();
  }

//返回
  returnstafflistc(){
  	this.staffnewSvc.getstafflist();
  }

     detailInit(){
      let self = this;
      var _this = this;
       self.loading = true;
       let params ={
        id:this.$state.params.id,
        type:1
        };
       self.loadPromise = this.api.get('/Employee/detail',params);

       return self.loadPromise .then(res=>{
         self.loading = false;
         console.log(res.status_id)
            if(res.status_id==1){
              status_id:"恢复"
            }else{ status_id:"冻结"}

            _this.d=res;
           
        })
    }

  //     //获取功能模板 check 多选
  // getTempList(){
  //     this.templateSvc.getPageAllTempList().then((result)=>{
  //     this.scope.datas= result.datas; 
  //   });
  // }
}