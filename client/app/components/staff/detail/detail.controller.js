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
    this.d={}
 
  }

//返回
  returnstafflistc(){
  	this.staffnewSvc.getstafflist();
  }

  // detailInit(){
  //   var _this = this;
     
  //   return self.staffnewSvc.getDetail({
  //     id: this.$state.params.id
  //   }).then(data => {
       
  //     if(data){
  //        _this.d=data;
  //     }
  //   })
  // }

     detailInit(){
        var _this = this;
        console.log({id:this.$state.params.id});
        debugger;
        this.api.get('/Employee/detail/',{id:this.$state.params.id}).then(res=>{
            _this.d=res;
        })
    }
}